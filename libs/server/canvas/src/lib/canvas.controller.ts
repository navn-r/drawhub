import { UploadService, DriveService } from '@drawhub/server/upload';
import { Controller, Get, Logger, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CanvasId } from './canvas.schema';
import { CanvasService } from './canvas.service';
import { ManagementService } from '@drawhub/server/auth';

@UseGuards(AuthGuard('jwt'))
@Controller('canvas')
export class CanvasController {
  private logger: Logger = new Logger('CanvasEvents');

  constructor(
    private canvasService: CanvasService,
    private uploadService: UploadService,
    private managementService: ManagementService,
    private driveService: DriveService
  ) {}

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

  @Post(`:canvasId/drive`)
  @UseInterceptors(FileInterceptor('file'))
  async uploadToGoogleDrive(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Param('canvasId') canvasId: CanvasId
  ) {
    const { userId } = req['user'];
    console.log('BEFORE: ', userId);
    const { accessToken } = await this.managementService.getIdpAccessToken(userId);
    console.log('AFTER: ', canvasId);
    return this.driveService.upload(file, accessToken, canvasId as string);
  }
}
