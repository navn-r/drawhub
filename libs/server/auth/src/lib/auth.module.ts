import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ManagementService } from './management.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule],
  providers: [JwtStrategy, ManagementService],
  exports: [PassportModule, ManagementService],
  controllers: [AuthController],
})
export class AuthModule {}
