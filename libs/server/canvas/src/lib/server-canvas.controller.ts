import { Controller, Post, Body } from '@nestjs/common';
import { ServerCanvasService } from './server-canvas.service';
import { Canvas, CreateCanvasDto } from './canvas.schema';

@Controller('canvas')
export class ServerCanvasController {
  constructor(private serverCanvasService: ServerCanvasService) {}

  @Post()
  async create(@Body() item: CreateCanvasDto): Promise<Canvas> {
    return this.serverCanvasService.createCanvas({ ...item, membercount: 1 });
  }
}
