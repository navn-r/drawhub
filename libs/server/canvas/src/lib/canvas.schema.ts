import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CanvasDocument = Canvas & Document;

@Schema({ timestamps: true })
export class Canvas {
  @Prop({ required: false, trim: true, maxlength: 120 })
  name: string;

  @Prop({ required: true })
  memberCount: number;

  @Prop({ required: true })
  contributors: string[];
}

export type CreateCanvasDto = Omit<Canvas, 'contributors' | 'memberCount'>;
export const CanvasSchema = SchemaFactory.createForClass(Canvas);
