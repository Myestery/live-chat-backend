import {
  Conversation,
  ConversationSchema,
} from '../chat/entities/conversation.schema';
import { User, UserSchema } from '../user/entities/user.schema';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
})
export class ContactModule {}
