import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { DriveService } from './drive.service';

@Module({
  providers: [UploadService, DriveService],
  exports: [UploadService],
})
export class UploadModule {}
