import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServerMailerService } from './server-mailer.service';

@Module({
  imports: [
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
  providers: [ServerMailerService],
  exports: [ServerMailerService],
})
export class ServerMailerModule {}
