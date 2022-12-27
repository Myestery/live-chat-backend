import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/entities/user.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { IUser } from '../user/user.interface';
import * as mongoose from 'mongoose';
import {
  Conversation,
  ConversationDocument,
} from '../chat/entities/conversation.schema';
@Injectable()
export class ContactService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Conversation.name)
    private ConversationModel: Model<ConversationDocument>,
  ) {}
  async create(createContactDto: CreateContactDto, userId: string) {
    // check if user with email exists, if yes, add as contact on both sides
    // if not, throw error
    let user1: IUser = await this.UserModel.findById(userId);
    let user = await this.UserModel.findOne({
      email: createContactDto.email,
      _id: { $ne: userId },
    });
    if (user) {
      // create conversation first
      
      let contact = { ...createContactDto, user_id: user._id };
      let contact2 = {
        name: user1.name.firstname + ' ' + user1.name.lastname,
        email: user1.email,
        user_id: userId,
      };
      await this.UserModel.updateOne(
        { $and: [{ _id: userId }, { contacts: { $ne: contact } }] },
        { $push: { contacts: contact } },
      );
      await this.UserModel.updateOne(
        { $and: [{ _id: user._id }, { contacts: { $ne: contact2 } }] },
        { $push: { contacts: contact2 } },
      );
      return { message: 'Contact added' };
    } else {
      throw new HttpException('User not found', 404);
    }
  }

  async findAll(user_id: string) {
    return (await this.UserModel.findById(user_id).select('contacts')).contacts;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  async remove(id: string, userId: string) {
    await this.UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          contacts: {
            user_id: new mongoose.Types.ObjectId(id),
          },
        },
      },
    );

    // delete from other user's contacts
    await this.UserModel.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          contacts: {
            user_id: userId,
          },
        },
      },
    );

    return { message: 'Contact removed' };
  }
}
