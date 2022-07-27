import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
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

  getCanvasById(canvasId: string): Promise<Canvas> {
    return this.model.findById(canvasId).exec();
  }

  deleteCanvas(canvasId: string) {
    return this.model.findByIdAndDelete(canvasId);
  }

  async addContributor(canvasId: string, email: string) {
    const query = await this.model.find({ _id: canvasId, contributors: { $in: [email] } });
    if (query.length) {
      return;
    }

    return this.model.findByIdAndUpdate(canvasId, { $push: { contributors: email } });
  }

  markAsNotNew(canvasId: string) {
    return this.model.findByIdAndUpdate(canvasId, { isNew: false });
  }
}
