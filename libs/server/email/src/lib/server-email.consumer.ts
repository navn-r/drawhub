import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';

@Processor('email')
export class EmailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('send-email')
  async sendEmail(job: Job) {
    await this.mailService
      .sendMail({
        to: job?.data.owner,
        from: 'drawhubnoreply@gmail.com',
        subject: `Your canvas ${job.data.name} has been Stiched!`,
        text: `Hey ${job.data.owner}!\n Your canvas ${job.data.name} has been stiched by ${job.data.email}!`,
      })
      .catch((e) => {
        console.log(e);
      });
    return 'success';
  }
}
