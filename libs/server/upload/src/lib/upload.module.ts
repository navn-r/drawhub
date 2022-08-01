import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { DriveService } from './drive.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UploadService, DriveService],
  exports: [UploadService, DriveService],
})
export class UploadModule {}
