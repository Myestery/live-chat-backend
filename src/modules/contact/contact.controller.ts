import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from '../user/user.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('contact')
@UseGuards(AuthGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/')
  create(@Body() createContactDto: CreateContactDto, @User() user: IUser) {
    return this.contactService.create(createContactDto, user._id);
  }

  @Get('/')
  findAll(@User() user: IUser) {
    return this.contactService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.contactService.remove(id, user._id);
  }
}
