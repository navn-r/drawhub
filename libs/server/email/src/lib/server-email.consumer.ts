import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';

@Processor('email')
export class EmailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('send-email')
  async sendEmail(job: Job) {
    // Send the email from here.
    console.log(job.data);
    await this.mailService
      .sendMail({
        to: job?.data.email,
        from: 'drawhubnoreply@gmail.com',
        subject: 'Your canvas has been Stiched!',
        text: `Your canvas CANVAS_NAME_HERE has been stiched`,
      })
      .catch((e) => {
        console.log(e);
      });
    console.log('SENT!');
    return 'success';
  }
}
