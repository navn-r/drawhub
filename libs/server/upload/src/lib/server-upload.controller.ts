import { Controller, Delete, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ServerUploadService } from './server-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { get } from 'http';

@Controller('upload')
export class ServerUploadController {
  constructor(private serverUploadService: ServerUploadService) {}

  @Post(`:canvasId`)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param() params): Promise<void> {
    await this.serverUploadService.uploadImage(file, params.canvasId);
  }

  @Delete(`:canvasId`)
  async deleteImage(@Param() params): Promise<void> {
    await this.serverUploadService.deleteImage(params.canvasId);
  }
}
