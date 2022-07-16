import { Controller, Post, Body, UseGuards, Get, Req, Delete, Param } from '@nestjs/common';
import { CanvasService } from './server-canvas.service';
import { Canvas, CreateCanvasDto } from './canvas.schema';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('canvas')
export class ServerCanvasController {
  constructor(private canvasService: CanvasService) {}

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
  deleteCanvas(@Param('canvasId') canvasId: string) {
    return this.canvasService.deleteCanvas(canvasId);
  }
}
