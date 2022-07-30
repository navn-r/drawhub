import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailConsumer {
  @Process('send-email')
  sendEmail(job: Job<unknown>) {
    // Send the email from here.
    console.log(job.data);
  }
}
