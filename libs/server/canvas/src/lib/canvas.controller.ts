import { UploadService } from '@drawhub/server/upload';
import { Controller, Get, Logger, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CanvasId } from './canvas.schema';
import { CanvasService } from './canvas.service';

@UseGuards(AuthGuard('jwt'))
@Controller('canvas')
export class CanvasController {
  private logger: Logger = new Logger('CanvasEvents');

  constructor(private canvasService: CanvasService, private uploadService: UploadService) {}

  @Post(`:canvasId/upload`)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('canvasId') canvasId: CanvasId) {
    return Promise.all([
      this.uploadService.uploadImage(file, canvasId as string),
      this.canvasService.update(canvasId, { isNew: false }),
    ]).then(([upload]) => {
      this.logger.log(`[${canvasId}] CANVAS SAVED`);

      return upload;
    });
  }

  @Get(`:canvasId/image`)
  async getImage(@Param('canvasId') canvasId: CanvasId) {
    const { isNew } = await this.canvasService.get(canvasId);

    // No upload in s3 yet
    if (isNew) {
      return;
    }

    this.logger.log(`[${canvasId}] CANVAS LOADED`);
    return this.uploadService.getImage(canvasId as string);
  }
}
