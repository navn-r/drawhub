import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Canvas, CanvasDocument } from './canvas.schema';

@Injectable()
export class ServerCanvasService {
  constructor(
    @InjectModel(Canvas.name)
    private model: Model<CanvasDocument>
  ) {}

  createCanvas(item: Canvas): Promise<Canvas> {
    return this.model.create(item);
  }
}
