import { Chat, ChatSchema } from './entities/chat.schema';
import {
  Conversation,
  ConversationSchema,
} from './entities/conversation.schema';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
