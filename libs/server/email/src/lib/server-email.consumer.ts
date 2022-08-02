import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';

@Processor('email')
export class EmailConsumer {
  private logger: Logger = new Logger('EmailEvents');

  constructor(private mailService: MailerService) {}

  @Process('send-stitch')
  async sendEmail(job: Job) {
    this.logger.log(`[${job.data.name}] SENDING STITCH EMAIL <${job.data.owner}>`);

    await this.mailService.sendMail({
      to: job?.data.owner,
      from: 'drawhubnoreply@gmail.com',
      subject: `Your canvas ${job.data.name} has been Stitched!`,
      text: `Hey ${job.data.owner}!\n Your canvas ${job.data.name} has been stitched by ${job.data.email}!`,
    });

    this.logger.log(`[${job.data.canvasId}] SENT TO <${job.data.owner}>`);
  }

  @Process('send-invite')
  async addContributor(job: Job) {
    this.logger.log(`[${job.data.canvasId}] SENDING INVITE EMAIL <${job.data.email}>`);

    await this.mailService.sendMail({
      to: job?.data.email,
      from: 'drawhubnoreply@gmail.com',
      subject: `You have been invited!`,
      html: `
        <p>
          Hey, ${job?.data.email}! You have been invited to <strong>${job?.data.canvasName}</strong> by ${job.data.owner}!
          <br/>
          <a href="http://localhost/home/draw/${job?.data.canvasId}">Click Here</a> to get drawing!
          <br/>
          - DrawHub Team
        <p>
      `,
    });

    this.logger.log(`[${job.data.canvasId}] SENT TO <${job.data.email}>`);
  }
}
