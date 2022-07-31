import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('email')
export class EmailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('send-email')
  async sendEmail(job: Job) {
    await this.mailService
      .sendMail({
        to: job?.data.owner,
        from: 'drawhubnoreply@gmail.com',
        subject: `Your canvas ${job.data.name} has been Stitched!`,
        text: `Hey ${job.data.owner}!\n Your canvas ${job.data.name} has been stitched by ${job.data.email}!`,
      })
      .catch((e) => {
        console.log(e);
      });
    return 'success';
  }

  @Process('send-invite')
  async addContributor(job: Job) {
    await this.mailService.sendMail({
      to: job?.data.email,
      from: 'drawhubnoreply@gmail.com',
      subject: `You have been invited!`,
      html: `
      <p>
      Hey, ${job?.data.email}! You have been invited to <strong>${job?.data.canvasName}</strong>.
      <br/>
      <a href="http://localhost:4200/home/draw/${job?.data.canvasId}">Click Here</a> to get drawing!
      <br/>
      - DrawHub Team
      <p>
      `,
    });
  }
}
