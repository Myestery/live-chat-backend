import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export interface CallItem {
  _id: string | number;
  call_duration: number;
  starter: string;
  date: string;
  is_grouped: boolean;
  has_video_call: boolean;
  users?: Array<{
    _id: mongoose.Types.ObjectId;
    name: string;
  }>;
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Call {
  @Prop({ required: false })
  call_duration: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  starter: mongoose.Schema.Types.ObjectId;

  @Prop()
  date: Date;

  @Prop({ required: false })
  is_group: boolean;

  @Prop({ required: false })
  has_video_call: boolean;

  @Prop({ required: false })
  users: Array<{
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  }>;
}

export type CallDocument = Call & Document;

export const CallSchema = SchemaFactory.createForClass(Call);
