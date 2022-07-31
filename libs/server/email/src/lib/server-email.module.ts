import { Module } from '@nestjs/common';
import { ServerEmailService } from './server-email.service';
import { MailerModule } from '@nestjs-modules/mailer';

import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './server-email.consumer';

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
  providers: [ServerEmailService, EmailConsumer],
  exports: [ServerEmailService],
})
export class ServerEmailModule {}
