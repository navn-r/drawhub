import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CanvasId = MongooseSchema.Types.ObjectId | string;

@ObjectType()
@Schema({ timestamps: true })
export class Canvas {
  @Field(() => String)
  _id?: CanvasId; // For GraphQL Schema only

  @Field(() => String)
  @Prop({ required: false, trim: true, maxlength: 120 })
  name: string;

  @Field(() => [String])
  @Prop({ required: true })
  contributors: string[];

  @Field(() => Boolean, { defaultValue: true })
  @Prop({ default: true })
  isNew: boolean;
}

export type CanvasDocument = Canvas & Document;
export const CanvasSchema = SchemaFactory.createForClass(Canvas);
@InputType()
export class CreateCanvasInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class DeleteCanvasInput {
  @Field(() => String)
  _id: CanvasId;
}

@InputType()
export class UpdateCanvasInput {
  @Field(() => String)
  _id: CanvasId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  contributors?: string[];

  @Field(() => Boolean, { nullable: true })
  isNew?: boolean;
}

@InputType()
export class GetCanvasInput {
  @Field(() => String)
  _id: CanvasId;
}
