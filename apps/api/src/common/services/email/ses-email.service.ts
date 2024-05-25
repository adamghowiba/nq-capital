import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
  SESServiceException,
} from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';
import { EmailProvider, SendEmailParams } from './email.service';

@Injectable()
export class SesEmailService implements EmailProvider {
  private logger = new Logger(SesEmailService.name);
  private client = new SESClient({
    region: 'us-east-1',
  });

  constructor(public readonly sender?: string) {
    this.sender = 'automated@webrevived.com';
  }

  sendEmail(params: SendEmailParams) {
    this.logger.debug(
      `Sending single email to: ${params.destination?.toAddress?.toString()}`
    );
    return this.sendSesEmail(params);
  }

  sendBulkEmail(params: SendEmailParams) {
    throw new Error('Method not implemented.');
  }

  private getArrayValue(arrayOrString: string | string[]): string[] {
    return Array.isArray(arrayOrString) ? arrayOrString : [arrayOrString];
  }

  private async sendSesEmail(params: SendEmailParams) {
    try {
      const command = new SendEmailCommand({
        Source: this.sender,
        Destination: {
          ToAddresses: this.getArrayValue(params.destination.toAddress),
          CcAddresses: params.destination?.ccAddress
            ? this.getArrayValue(params.destination.ccAddress)
            : undefined,
          BccAddresses: params.destination?.bccAddress
            ? this.getArrayValue(params.destination.bccAddress)
            : undefined,
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: params.body?.html,
            },
            Text: {
              Charset: 'UTF-8',
              Data: params.body?.html,
            },
          },
          Subject: {
            Data: params.subject,
          },
        },
      });
      const response = await this.client.send(command);

      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof SESServiceException) {
        console.debug(
          `Failed to send email to ${params.destination?.toAddress?.toString?.()}.`,
          {
            requestID: error.$metadata.requestId,
          }
        );
        return;
      }

      console.debug(
        `Failed to send email to ${params.destination?.toAddress?.toString?.()}.`
      );
    }
  }
}
