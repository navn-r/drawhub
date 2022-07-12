import { Module } from '@nestjs/common';
import { ServerUploadController } from './server-upload.controller';
import { ServerUploadService } from './server-upload.service';

@Module({
  controllers: [ServerUploadController],
  providers: [ServerUploadService],
  exports: [ServerUploadService],
})
export class ServerUploadModule {}
