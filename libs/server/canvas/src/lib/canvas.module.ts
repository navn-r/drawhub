import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Canvas, CanvasSchema } from './canvas.schema';
import { CanvasController } from './canvas.controller';
import { CanvasService } from './canvas.service';
import { CanvasEventsGateway } from './canvas-events-gateway';
import { UploadModule } from '@drawhub/server/upload';
import { CanvasResolver } from './canvas.resolver';
import { EmailModule } from '@drawhub/server/email';
import { AuthModule } from '@drawhub/server/auth';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Canvas.name, schema: CanvasSchema }]),
    UploadModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [CanvasController],
  providers: [CanvasService, CanvasEventsGateway, CanvasResolver],
  exports: [CanvasService],
})
export class CanvasModule {}
