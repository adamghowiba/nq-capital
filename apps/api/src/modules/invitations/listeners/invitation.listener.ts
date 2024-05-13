import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InvitationEvent } from '../events/events.constant';
import { InvitationCreatedEvent } from '../events/invite.event';
import { EmailService } from '../../../common/services/email/email.service';
import { InvitationType } from '@prisma/client';

@Injectable()
export class InvitationListener {
  private readonly logger = new Logger(InvitationListener.name);

  constructor(private readonly emailService: EmailService) {}

  @OnEvent(InvitationEvent.INVITATION_CREATED)
  async handleInvitationCreatedEvent(payload: InvitationCreatedEvent) {
    const email = await this.sendInvitationEmail({
      email: payload.email,
      type: payload.type,
      token: payload.code,
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
      <h3>You've been invited to NQ ${applicationName}. Click the link below to accept the invitation. </h3>

      <p>
        We are pleased to invite you to join the NQ Investors Portal. you will gain access to exclusive <br />
        tools and resources designed to help you effectively manage and enhance your investment portfolio. <br/>
        Welcome aboard and thank you for trusting us with your investment journey. <br />
      </p>


      <a href="http://localhost:3000/invitations/accept/${params.token}">Accept invitation</a> <br /><br />

      <span> Warm regards, </span> <br/>
      <span> NQ Capital Team </span>
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
