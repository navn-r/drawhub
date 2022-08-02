import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ManagementService } from './management.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule],
  providers: [JwtStrategy, ManagementService],
  exports: [PassportModule, ManagementService],
})
export class AuthModule {}
