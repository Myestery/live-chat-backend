import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { CallService } from './call.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { IUser } from '../user/user.interface';

@Controller('calls')
export class CallController {
  constructor(private readonly callService: CallService) {}

  // @Post()
  // create(@Body() createCallDto: CreateCallDto) {
  //   return this.callService.create(createCallDto);
  // }

  @Get()
  findAll(@User() user: IUser) {
    return this.callService.findAll(user._id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.callService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCallDto: UpdateCallDto) {
  //   return this.callService.update(+id, updateCallDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.callService.remove(+id);
  // }
}
