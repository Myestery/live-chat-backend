import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IUser extends Document {
  id?: string;
  name: Record<string, any>;
  password: string;
  password_reset_code?: string;
  email: string;
  image_url: string;
  verified_email: boolean;
}