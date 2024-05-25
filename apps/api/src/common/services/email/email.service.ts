import { Injectable } from '@nestjs/common';
import { SesEmailService } from './ses-email.service';
import { SendEmailCommandInput } from '@aws-sdk/client-ses';

export interface SendEmailResponse {
  status: 'success' | 'failed' | 'fatal';
  message: string;
}

export type EmailSource = 'automated@webrevived.com';

export interface SendEmailParams {
  destination: {
    toAddress: string | string[];
    ccAddress?: string | string[];
    bccAddress?: string | string[];
  };
  subject: string;
  body: {
    text?: string;
    html?: string;
  };
  source?: EmailSource;
}

export abstract class EmailProvider {
  abstract sendEmail(params: SendEmailParams): any;

  abstract sendBulkEmail(params: SendEmailParams): any;
}

@Injectable()
export class EmailService implements EmailProvider {
  private readonly emailProvider!: EmailProvider;

  constructor(emailProvider?: EmailProvider) {
    this.emailProvider = emailProvider || new SesEmailService();
  }

  sendEmail<Response = SendEmailResponse>(
    params: SendEmailParams
  ): Promise<Response> {
    const response = this.emailProvider.sendEmail(params);
    return response;
  }

  sendBulkEmail(params: SendEmailParams) {
    return this.emailProvider.sendBulkEmail(params);
  }
}
