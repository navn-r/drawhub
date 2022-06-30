import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerAuthService {
  getCurrentUser() {
    return {
      authenticated: true,
    };
  }
}
