import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Canvas, CanvasDocument } from './canvas.schema';

@Injectable()
export class CanvasService {
  constructor(
    @InjectModel(Canvas.name)
    private model: Model<CanvasDocument>
  ) {}

  createCanvas(item: Canvas): Promise<Canvas> {
    return this.model.create(item);
  }

  getAllCanvas(): Promise<Canvas[]> {
    return this.model.find().exec();
  }

  deleteCanvas(canvasId: string) {
    return this.model.findByIdAndDelete(canvasId);
  }

  async addContributor(canvasId: string, email: string) {
    const lmao = await this.model.find({ _id: canvasId, contributors: { $in: [email] } });
    if (lmao.length) {
      return;
    }

    return this.model.findByIdAndUpdate(canvasId, { $push: { contributors: email } });
  }
}
