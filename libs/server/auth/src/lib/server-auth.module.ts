import { Module } from '@nestjs/common';
import { ServerAuthController } from './server-auth.controller';
import { ServerAuthService } from './server-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ServerAuthController],
  providers: [JwtStrategy, ServerAuthService],
  exports: [PassportModule, ServerAuthService],
})
export class ServerAuthModule {}
