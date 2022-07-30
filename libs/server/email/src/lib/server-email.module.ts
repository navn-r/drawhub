import { Module } from '@nestjs/common';
import { ServerEmailService } from './server-email.service';

import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './server-email.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [],
  providers: [ServerEmailService, EmailConsumer],
  exports: [ServerEmailService],
})
export class ServerEmailModule {}
