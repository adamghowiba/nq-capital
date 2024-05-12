import { Injectable } from '@nestjs/common';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { PrismaService } from '@nq-capital/service-database';
import { InvitationEntity } from './entities/invitation.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InvitationEvent } from './events/events.constant';
import { InvitationCreatedEvent } from './events/invite.event';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly event: EventEmitter2
  ) {}

  async inviteInvestor(createInvitationInput: CreateInvitationInput) {
    const invitation = await this.prisma.invitation.create({
      data: {
        ...createInvitationInput,
        type: 'INVESTOR',
      },
    });

    this.event.emit(
      InvitationEvent.INVITATION_CREATED,
      new InvitationCreatedEvent({
        email: invitation.email,
        type: invitation.type,
      })
    );

    return invitation;
  }

  async list(): Promise<InvitationEntity[]> {
    const invitation = await this.prisma.invitation.findMany();

    return invitation;
  }

  async retrieve(id: number): Promise<InvitationEntity> {
    const invitation = await this.prisma.invitation.findUniqueOrThrow({
      where: { id },
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
