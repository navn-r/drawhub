import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ServerEmailService {
  private logger: Logger = new Logger('EmailEvents');

  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  add(owner: string, email: string, canvasName: string, canvasId: string) {
    this.logger.log(`[${canvasId}] ADDING JOB TO QUEUE <send-stitch>`);
    this.emailQueue.add('send-stitch', { owner, email, canvasName, canvasId });
  }

  invite(owner: string, email: string, canvasName: string, canvasId: string) {
    this.logger.log(`[${canvasId}] ADDING JOB TO QUEUE <send-invite>`);
    this.emailQueue.add('send-invite', { owner, email, canvasName, canvasId });
  }
}
