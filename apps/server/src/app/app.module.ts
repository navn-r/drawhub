import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServerAuthModule } from '@drawhub/server/auth';

@Module({
  imports: [ServerAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
