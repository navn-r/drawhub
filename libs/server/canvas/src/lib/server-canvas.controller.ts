import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CanvasService } from './server-canvas.service';
import { Canvas, CreateCanvasDto } from './canvas.schema';
import { AuthGuard } from '@nestjs/passport';
import { ServerUploadService } from '@drawhub/server/upload';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard('jwt'))
@Controller('canvas')
export class ServerCanvasController {
  constructor(private canvasService: CanvasService, private serverUploadService: ServerUploadService) {}

  @Post()
  create(@Req() req: Request, @Body() item: CreateCanvasDto): Promise<Canvas> {
    const { email } = req['user'];
    return this.canvasService.createCanvas({ ...item, memberCount: 1, contributors: [email] });
  }

  /**
   * TODO we need to get all canvases based on the user that is logged in.
   */
  @Get()
  getAllCanvas(): Promise<Canvas[]> {
    return this.canvasService.getAllCanvas();
  }

  @Delete('/:canvasId')
  async deleteCanvas(@Param('canvasId') canvasId: string) {
    return Promise.all([this.serverUploadService.deleteImage(canvasId), this.canvasService.deleteCanvas(canvasId)]);
  }

  @Post(`:canvasId/upload`)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('canvasId') canvasId: string): Promise<void> {
    await this.serverUploadService.uploadImage(file, canvasId);
  }

  @Get(`:canvasId/image`)
  async getImage(@Param('canvasId') canvasId: string) {
    return this.serverUploadService.getImage(canvasId);
  }
}
