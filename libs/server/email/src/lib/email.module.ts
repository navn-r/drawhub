import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './email.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env['EMAIL_SERVER'],
        auth: {
          user: process.env['EMAIL_USERNAME'],
          pass: process.env['EMAIL_PASSWORD'],
        },
      },
    }),
  ],
  controllers: [],
  providers: [EmailService, EmailConsumer],
  exports: [EmailService],
})
export class EmailModule {}
