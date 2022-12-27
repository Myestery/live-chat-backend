import { CreateChatDto } from './dto/create-chat.dto';
import { Injectable } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './entities/chat.schema';
import {
  Conversation,
  ConversationDocument,
  IConversation,
} from './entities/conversation.schema';
import { IUser } from '../user/user.interface';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}
  create(createChatDto: CreateChatDto) {
    return [];
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return [];
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return [];
  }

  remove(id: number) {
    return [];
  }

  async getConversations(userId: string): Promise<Partial<IConversation>[]> {
    const conversations = await this.conversationModel
      .find({
        members: { $in: [userId] },
      })
      .populate('members', 'name image_url')
      .populate('last_message', 'message')
      .sort({ updatedAt: -1 })
      .exec();
    // console.log(conversations);
    return conversations.map((conversation) => {
      const otherMember = (conversation.members as Array<IUser>).find(
        (member) => member._id != userId,
      );
      return {
        ...conversation.toJSON(),
        _id: conversation._id,
        user: otherMember,
        last_message: (conversation.last_message as { message: string })
          ?.message,
        members: undefined,
      };
    });
  }
}
