import { Controller, Get } from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';

@Controller('auth')
export class ServerAuthController {
  constructor(private authService: ServerAuthService) {}

  @Get("/")
  getCurrentUser() {
    return this.authService.getCurrentUser();
  }
}