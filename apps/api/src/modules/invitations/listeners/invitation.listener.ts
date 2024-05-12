import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InvitationEvent } from '../events/events.constant';
import { InvitationCreatedEvent } from '../events/invite.event';
import { EmailService } from 'apps/api/src/common/services/email/email.service';
import { InvitationType } from '@prisma/client';

@Injectable()
export class InvitationListener {
  private readonly logger = new Logger(InvitationListener.name);

  constructor(private readonly emailService: EmailService) {}

  @OnEvent(InvitationEvent.INVITATION_CREATED)
  async handleInvitationCreatedEvent(payload: InvitationCreatedEvent) {
    const token = payload.code || Math.random().toString(36).substring(2, 15);

    const email = await this.sendInvitationEmail({
      email: payload.email,
      type: payload.type,
      token,
    });

    return email;
  }

  @OnEvent(InvitationEvent.INVITATION_REJECTED)
  async handleInvitationRejectedEvent(payload: InvitationCreatedEvent) {
    this.logger.debug('Invitation Rejected Event', payload);
  }

  async sendInvitationEmail(params: {
    email: string;
    token: string;
    type: InvitationType;
  }) {
    const applicationName =
      params.type === 'INVESTOR' ? 'Investors Portal' : 'Admin Portal';

    const emailHtmlBody = `
      <h1>You've been invited to NQ ${applicationName} </h1> <br /> <br />

      <p>Click <a href="http://localhost:3000/invitations/accept/${params.token}">here</a> to accept the invitation</p>
    `;

    return this.emailService.sendEmail({
      destination: {
        toAddress: params.email,
      },
      body: {
        html: emailHtmlBody,
      },
      subject: `NQ Capital ${applicationName} Invitation`,
    });
  }
}
