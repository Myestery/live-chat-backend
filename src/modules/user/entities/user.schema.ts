import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { ContactSchema, IContact } from 'src/modules/contact/entities/contact.schema';

export type UserDocument = User & Document;
// = new mongoose.Schema({
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop(
    raw({
      firstname: { type: String },
      lastname: { type: String },
      middlename: { type: String },
    }),
  )
  name: Record<string, any>;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  password_reset_code: string;

  @Prop({ required: false })
  verified_email: boolean;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  image_url: string;

  @Prop({ required: false, type: [ContactSchema] })
  contacts: Array<IContact>;
}
export const UserSchema = SchemaFactory.createForClass(User);
