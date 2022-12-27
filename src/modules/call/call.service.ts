import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { Call, CallDocument } from './entities/call.schema';

@Injectable()
export class CallService {
  constructor(@InjectModel(Call.name) private CallModel: Model<CallDocument>) {}
  create(createCallDto: CreateCallDto) {
    return 'This action adds a new call';
  }

  findAll(_id: string) {
    // find all calls where the user is the starter or the user is in the users array
    return this.CallModel.find({
      $or: [{ starter: _id }, { users: { $elemMatch: { 'user._id': _id } } }],
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} call`;
  // }

  // update(id: number, updateCallDto: UpdateCallDto) {
  //   return `This action updates a #${id} call`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} call`;
  // }
}
