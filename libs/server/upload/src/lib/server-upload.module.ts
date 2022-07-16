import { Module } from '@nestjs/common';
import { ServerUploadService } from './server-upload.service';

@Module({
  providers: [ServerUploadService],
  exports: [ServerUploadService],
})
export class ServerUploadModule {}
