import { ServerUploadService } from '@drawhub/server/upload';
import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CanvasId } from './canvas.schema';
import { CanvasService } from './server-canvas.service';

@UseGuards(AuthGuard('jwt'))
@Controller('canvas')
export class ServerCanvasController {
  constructor(private canvasService: CanvasService, private serverUploadService: ServerUploadService) {}

  @Post(`:canvasId/upload`)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('canvasId') canvasId: CanvasId) {
    return Promise.all([
      this.serverUploadService.uploadImage(file, canvasId as string),
      this.canvasService.update(canvasId, { isNew: false }),
    ]).then(([upload]) => upload);
  }

  @Get(`:canvasId/image`)
  async getImage(@Param('canvasId') canvasId: string) {
    return this.serverUploadService.getImage(canvasId);
  }
}
