import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ServerEmailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}
  add(owner: string, email: string, name: string): void {
    this.emailQueue.add('send-email', { owner, email, name });
  }

  invite(email: string, canvasName: string, canvasId: string) {
    this.emailQueue.add('send-invite', { email, canvasName, canvasId });
  }
}
