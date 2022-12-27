import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileDetailsTypes } from './profile';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from '../user/user.interface';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/')
  async getProfile(
    @User() user: IUser,
  ): Promise<ProfileDetailsTypes> {
    // let firebaseUser = await this.profileService.getProfile(user._id);
    // console.log(firebaseUser)
    return {
      basicDetails: {
        firstName: user.name.firstname,
        lastName: user.name.lastname,
        title: 'Front end Developer',
        description:
          'If several languages coalesce, the grammar of the resulting language is more simple.',
        fullName: user.name.firstname + ' ' + user.name.lastname,
        email: user.email,
        location: 'California, USA',
        avatar: user.image_url,
        coverImage: 'https://picsum.photos/200/300',
      }
    };
  }

}
