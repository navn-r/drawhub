import { Module } from '@nestjs/common';
import { ServerAuthController } from './server-auth.controller';
import { ServerAuthService } from './server-auth.service';

@Module({
  controllers: [ServerAuthController],
  providers: [ServerAuthService],
  exports: [ServerAuthService],
})
export class ServerAuthModule {}
