import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SesEmailService } from './ses-email.service';

@Module({
  providers: [
    {
      provide: EmailService,
      useValue: new EmailService(new SesEmailService()),
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
