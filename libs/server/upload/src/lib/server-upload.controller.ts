import { Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServerUploadService } from './server-upload.service';

@UseGuards(AuthGuard('jwt'))
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
