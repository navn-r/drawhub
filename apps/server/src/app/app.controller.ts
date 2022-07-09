import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/public')
  getPublicData() {
    return {
      ...this.appService.getData(),
      access: 'PUBLIC',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/protected')
  getProtectedData() {
    return {
      ...this.appService.getData(),
      access: 'PROTECTED',
    };
  }
}
