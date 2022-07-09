import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Canvas, CanvasSchema } from './canvas.schema';
import { ServerCanvasController } from './server-canvas.controller';
import { ServerCanvasService } from './server-canvas.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Canvas.name, schema: CanvasSchema }])],
  controllers: [ServerCanvasController],
  providers: [ServerCanvasService],
  exports: [ServerCanvasService],
})
export class ServerCanvasModule {}
