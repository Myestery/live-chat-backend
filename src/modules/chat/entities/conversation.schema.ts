import * as mongoose from 'mongoose';

// import { ContactSchema, IContact } from 'src/modules/contact/entities/contact.schema';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { IUser } from '../../user/user.interface';

export type ConversationDocument = Conversation & Document;
// = new mongoose.Schema({
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Conversation {
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  members: Array<mongoose.Schema.Types.ObjectId> | Array<IUser>;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Chat' })
  last_message: string | { message: string };
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
export interface IConversation {
  _id: string;
  members: Array<mongoose.Schema.Types.ObjectId> | Array<IUser>;
  last_message: string | { message: string };
}
