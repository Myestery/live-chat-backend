import { CreateProfileDto } from './dto/create-profile.dto';
// import { Firebase } from 'src/modules/firebase/providers/firebase';
import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
@Injectable()
export class ProfileService {
  constructor() { }
  
  async getProfile(uid: string) {
    
  }
}
