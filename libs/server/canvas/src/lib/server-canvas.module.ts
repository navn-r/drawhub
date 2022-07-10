import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Canvas, CanvasSchema } from './canvas.schema';
import { ServerCanvasController } from './server-canvas.controller';
import { CanvasService } from './server-canvas.service';
import { CanvasEventsGateway } from './canvas-events-gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Canvas.name, schema: CanvasSchema }])],
  controllers: [ServerCanvasController],
  providers: [CanvasService, CanvasEventsGateway],
  exports: [CanvasService],
})
export class ServerCanvasModule {}
