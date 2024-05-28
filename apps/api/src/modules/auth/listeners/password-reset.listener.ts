import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BACKOFFICE_URL, INVESTORS_PORTAL_URL } from '@nq-capital/utils-constants';
import { EmailService } from '../../../common/services/email/email.service';
import { AUTH_EVENTS } from '../constants/event.constants';
import { RequestPasswordResetEvent } from '../events/request-password-reset.event';

@Injectable()
export class PasswordResetListener {
  private readonly logger = new Logger(PasswordResetListener.name);

  constructor(private readonly emailService: EmailService) {}

  @OnEvent(AUTH_EVENTS.requestPasswordReset)
  async sendPasswordResetEmail(payload: RequestPasswordResetEvent) {
    const profileType = payload.requestedByProfile.type;
    const baseUrl =
      profileType === 'ADMIN' ? BACKOFFICE_URL.href : INVESTORS_PORTAL_URL.href;

    // const html = await renderEmailTemplate('resetPassword', {
    //   requestedByEmail: payload.requestedByUser.email,
    //   // TODO: Replace with actual email
    //   resetPasswordUrl: `${baseUrl}/reset?token=${payload.token}&user_id=${payload.requestedByUser.id}`,
    // })

    await this.emailService.sendEmail({
      subject: 'Reset your password',
      destination: {
        toAddress: payload.requestedByProfile.email,
      },
      body: {
        html: `
          <p>Hi ${payload.requestedByProfile.first_name},</p>

          <p>
            You have requested to reset your password. Please click the link below to reset your password.
          </p>

          <a href="${baseUrl}/reset?token=${payload.token}&user_id=${payload.requestedByProfile.id}">Reset password</a>

          <p>If you did not request this, please ignore this email.</p>
      `,
      },
    });
  }
}
