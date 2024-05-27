import { Injectable } from '@nestjs/common';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { PrismaService } from '@nq-capital/service-database';
import { InvitationEntity } from './entities/invitation.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InvitationEvent } from './events/events.constant';
import { InvitationCreatedEvent } from './events/invite.event';
import { ListInvitationArgs } from './dto/get-invitations.input';
import { DateTime } from 'luxon';
import { ApiError } from '../../common/exceptions/api.error';
import { InvestorsService } from '../investors/investors.service';
import { AcceptInvestorInvitationInput } from './dto/accept-invitation.input';
import { omit } from '@nq-capital/utils';
import { InvitationType } from '@prisma/client';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly event: EventEmitter2,
    private readonly investorService: InvestorsService
  ) {}

  async inviteInvestor(createInvitationInput: CreateInvitationInput) {
    const invitation_code = Math.random().toString(36).substring(7);

    const investor = await this.prisma.investor.findUnique({
      where: { email: createInvitationInput.email },
    });

    if (investor)
      throw new ApiError('Investor already exists', {
        meta: {
          email: createInvitationInput.email,
          investor_id: investor.id,
          created_at: investor.created_at,
        },
      });

    const invitation = await this.prisma.invitation.upsert({
      where: {
        email_type: {
          email: createInvitationInput.email,
          type: 'INVESTOR',
        },
      },
      create: {
        email: createInvitationInput.email,
        invited_by_user_id: createInvitationInput.invited_by_user_id,
        invitation_code: invitation_code,
        status: 'PENDING',
        type: 'INVESTOR',
      },
      update: {
        expires_at: DateTime.now().plus({ days: 7 }).toJSDate(),
        resent_count: {
          increment: 1,
        },
        status: 'PENDING',
      },
    });

    this.event.emit(
      InvitationEvent.INVITATION_CREATED,
      new InvitationCreatedEvent({
        email: invitation.email,
        type: invitation.type,
        code: invitation_code,
      })
    );

    return invitation;
  }

  async list(args: ListInvitationArgs): Promise<InvitationEntity[]> {
    const invitation = await this.prisma.invitation.findMany({
      where: {
        email: args.emails ? { in: args.emails } : undefined,
        status: args.statuses ? { in: args.statuses } : undefined,
      },
    });

    return invitation;
  }

  /**
   * Retrieve a valid invitation, other it will throw an error
   * @param params
   */
  async retrieveValidInvitation(params: {
    invitationCode: string;
    type: InvitationType;
  }) {
    const investorInvitation = await this.prisma.invitation.findUnique({
      where: {
        invitation_code: params.invitationCode,
        type: params.type,
      },
    });

    if (!investorInvitation)
      throw new ApiError('Invitation not found', {
        statusCode: 404,
        explanation:
          'This invitation was not found, please request another one from an admin.',
      });

    if (
      investorInvitation.status === 'ACCEPTED' ||
      investorInvitation.status === 'REVOKED'
    )
      throw new ApiError('Invitation is invalid', {
        statusCode: 400,
        explanation:
          'This invitation is invalid, please request another one from an admin.',
      });

    if (
      investorInvitation.status === 'EXPIRED' ||
      DateTime.now() > DateTime.fromJSDate(investorInvitation.expires_at)
    )
      throw new ApiError('Invitation is expired', {
        statusCode: 400,
        explanation:
          'This invitation is expired, please request another one from an admin.',
      });
  }

  async acceptInvestorInvitation(
    acceptInvestorInvitationInput: AcceptInvestorInvitationInput
  ) {
    const invitation = await this.retrieveValidInvitation({
      invitationCode: acceptInvestorInvitationInput.invitation_code,
      type: 'INVESTOR',
    });

    const investor = await this.investorService.create(
      omit(acceptInvestorInvitationInput, ['invitation_code'])
    );

    return investor;
  }

  async retrieve(invitationCode: string): Promise<InvitationEntity> {
    const invitation = await this.prisma.invitation.findUniqueOrThrow({
      where: { invitation_code: invitationCode },
    });

    return invitation;
  }

  async update(id: number, updateInvitationInput: UpdateInvitationInput) {
    const invitation = await this.prisma.invitation.update({
      where: { id },
      data: { ...updateInvitationInput },
    });

    return invitation;
  }

  async remove(id: number) {
    const invitation = await this.prisma.invitation.delete({ where: { id } });

    return invitation;
  }
}
