import { CreateChatDto } from './dto/create-chat.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Chat, ChatDocument } from './entities/chat.schema';
import {
  ConversationDocument,
  IConversation,
  Conversation,
} from './entities/conversation.schema';
import { IUser } from '../user/user.interface';
import { User, UserDocument } from '../user/entities/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
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
        (member) => String(member._id) != String(userId),
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

  async getUserDetails(id: string, myId: string): Promise<IUser> {
    let conversation = await this.conversationModel.findById<IConversation>(id);
    let userId = (conversation.members as Array<unknown>).find(
      (member) => String(member) != String(myId),
    );
    const user = await this.userModel
      .findById(userId)
      .select('name image_url')
      .exec();
    if (!user) throw new HttpException('User not found', 404);
    let name = user.toJSON().name;
    return { ...user.toJSON(), ...name, conversation_id: id } as IUser;
  }

  async readConversation(id: string, user_id: string) {
    // update all chats , add user_id to read_by array
    await this.chatModel.updateMany(
      { conversation_id: id, read_by: { $ne: user_id } },
      { $addToSet: { read_by: user_id } },
    );
  }

  async getUserConversations(id: string, user_id: string) {
    const conversation = await this.conversationModel.find({
      members: { $in: [user_id] },
      _id: id,
    });
    if (!conversation) throw new HttpException('Conversation not found', 404);
    let chats = await this.chatModel
      .find({ conversation_id: id })
      .sort({ created_at: -1 })
      .exec();
    return chats.reverse();
  }

  async sendMessage(
    id: string,
    body: CreateChatDto,
    user_id: string,
  ): Promise<Chat> {
    const conversation = await this.conversationModel
      .findOne({
        members: { $in: [user_id] },
        _id: id,
      })
      .exec();
    if (!conversation) throw new HttpException('Conversation not found', 404);
    // check if user is part of conversation
    const chat = await this.chatModel.create({
      ...body,
      conversation_id: id,
      sender: user_id,
      message: body.text,
    });
    conversation.last_message = chat._id;
    await conversation.save();
    return chat;
  }
}

// @Prop({ required: false, type: Boolean, default: false })
// is_file: boolean;

// @Prop({ required: false, type: String })
// file_url: string;

// @Prop({ required: false, default: 'text' })
// media_type: string;

// @Prop({ required: false, default: [] })
// read_by: string[];
