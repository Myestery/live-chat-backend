import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from '../user/user.interface';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get('/user-details/:id')
  getUserDetails(@Param('id') id: string, @User() user: IUser) {
    return this.chatService.getUserDetails(id, user._id);
  }

  @Get('/archive-contact')
  findAllArchived() {
    return [];
  }

  @Get('/conversations')
  findOne(@User() user: IUser) {
    return this.chatService.getConversations(user._id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Put('read-conversation/:id')
  readConversation(@Param('id') id: string, @User() user: IUser) {
    return this.chatService.readConversation(id, user._id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }

  @Get('user-conversations/:id')
  async getUserConversations(@Param('id') id: string, @User() user: IUser) {
    return this.chatService.getUserConversations(id, user._id);
  }

  @Post('message/:id')
  async sendMessage(
    @Param('id') id: string,
    @Body() body: CreateChatDto,
    @User() user: IUser,
  ) {
    return this.chatService.sendMessage(id, body, user._id);
  }
}
