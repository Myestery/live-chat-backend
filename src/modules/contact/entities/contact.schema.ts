import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
class ContactS extends Document {
  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'User' })
  user_id: mongoose.Types.ObjectId;
  @Prop({ required: false })
  name: string;
  @Prop({ required: false })
  email: string;
  @Prop({ required: true , type: mongoose.Types.ObjectId, ref: 'Conversation' })
  conversation_id: mongoose.Types.ObjectId;
}
export const ContactSchema = SchemaFactory.createForClass(ContactS);

export interface IContact {
  user_id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  conversation_id: mongoose.Types.ObjectId | string;
}
