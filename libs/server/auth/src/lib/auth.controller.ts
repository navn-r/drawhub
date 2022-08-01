import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ManagementService } from './management.service';

@Controller('auth')
@UseGuards(AuthGuard('jwt'))
export class AuthController {
  constructor(private managementService: ManagementService) {}

  @Get('/me')
  me(@Req() req: Request) {
    const { userId } = req['user'];

    return this.managementService.getIdpAccessToken(userId);
  }
}
