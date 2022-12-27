import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;
// = new mongoose.Schema({
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Chat {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  })
  conversation_id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: string;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ required: false, type: Boolean, default: false })
  is_file: boolean;

  @Prop({ required: false, type: String })
  file_url: string;

  @Prop({ required: false, default: 'text' })
  media_type: string;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);
