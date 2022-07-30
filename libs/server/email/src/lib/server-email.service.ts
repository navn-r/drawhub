import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Injectable()
export class ServerEmailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}
  add(email: string): void {
    this.emailQueue.add('send-email', { email: email });
  }
}
