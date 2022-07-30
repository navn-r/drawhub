import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Canvas, CanvasDocument, CanvasId, UpdateCanvasInput } from './canvas.schema';

@Injectable()
export class CanvasService {
  constructor(
    @InjectModel(Canvas.name)
    private model: Model<CanvasDocument>
  ) {}

  create(item: Canvas): Promise<Canvas> {
    return this.model.create(item);
  }

  getAll(email?: string): Promise<Canvas[]> {
    const filter = email ? { $or: [{ contributors: { $in: [email] } }, { isPublic: true }] } : {};

    return this.model.find(filter).exec();
  }

  get(canvasId: CanvasId): Promise<Canvas> {
    return this.model.findById(canvasId).exec();
  }

  delete(canvasId: CanvasId) {
    return this.model.findByIdAndDelete(canvasId);
  }

  update(canvasId: CanvasId, data: Omit<UpdateCanvasInput, '_id'>) {
    return this.model.findByIdAndUpdate(
      canvasId,
      { ...data },
      {
        returnDocument: 'after',
      }
    );
  }

  async saveContributor(canvasId: CanvasId, email: string) {
    const query = await this.model.find({ _id: canvasId, contributors: { $in: [email] } });

    // contributor is already added
    if (query.length) {
      return;
    }

    return this.model.findByIdAndUpdate(canvasId, { $push: { contributors: email } });
  }
}
