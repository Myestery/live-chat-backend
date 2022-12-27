import { Firebase } from '../firebase/providers/firebase';
import { IUser } from '../user/user.interface';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserDocument } from '../user/entities/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
const bcrypt = require('bcryptjs');
import JwtPayload from './dto/jwt-payload.dto';
import LoginDto from './dto/login-user.dto';
import UserNotFound from 'src/common/exceptions/UserNotFound.exception';
import WrongLogin from 'src/common/exceptions/WrongLogin.exception';
import CreateUserDto from './dto/create-user.dto';
import { truncateSync } from 'fs';
import EmailExists from 'src/common/exceptions/email-exists.exception';
require('dotenv').config();
let pass = process.env.JWT_SECRET_KEY;
@Injectable()
export class AuthService {
  constructor(
    private firebase: Firebase,
    private jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  updatePassword(updatePasswordDto: UpdatePasswordDto, uid: string) {
    return this.firebase.changePassword(uid, updatePasswordDto.password);
  }

  async findOne(email: string, getPassword: boolean = false): Promise<IUser> {
    let user = getPassword
      ? await this.UserModel.findOne({ email: email.toLowerCase() }).select(
          '+password',
        )
      : await this.UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return user;
    } else {
      UserNotFound();
    }
  }
  async validateUser(loginForm: LoginDto): Promise<IUser> {
    const user = await this.findOne(loginForm.email, true);
    let comparison = false;
    await bcrypt
      .compare(loginForm.password, user.password)
      .then((isMatched) => {
        if (isMatched) {
          comparison = isMatched;
        }
      });
    if (comparison) {
      return { ...user }['_doc'];
    }
    WrongLogin();
  }
  // async getUserFromToken(token: string): Promise<boolean | IUser> {
  //   let user = await this.firebase.verifyToken(token);
  //   if (!user) return false;
  //   return user;
  // }

  async getUserFromToken(token: string) {
    let res;
    try {
      res = await this.jwtService.verifyAsync(token, {
        secret: `${pass}`,
      });
    } catch (error) {
      res = false;
    }
    if (!!res) {
      try {
        let user = await this.findOne(res.email);
        return user;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

  async login(user: IUser) {
    const payload: JwtPayload = {
      id: user._id,
      meta: {},
      email: user.email,
    };

    let access_token: String;
    try {
      access_token = await this.jwtService.signAsync(payload);
    } catch (e) {
      Logger.log(e.message);
    }
    return {
      statusCode: 200,
      data: {
        access_token: access_token,
        user: {
          id: user._id,
          email: user.email,
          image_url: user.image_url,
        },
      },
      message: 'Successful Login',
    };
  }

  async createUser(registrationForm: CreateUserDto) {
    // check if the email exists first
    let email_exists: boolean = false;
    try {
      email_exists = !!(await this.UserModel.findOne({
        email: registrationForm.email.toLowerCase(),
      }));
    } catch (error) {
      // do nothing
      console.log(error);
    }

    if (email_exists) {
      EmailExists();
    }
    // let username = this.uniqueUsername();
    // encrypt password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(registrationForm.password, salt);
    let user = {
      email: registrationForm.email.toLowerCase(),
      password: hash,
      name: {
        firstname: registrationForm.firstname,
        lastname: registrationForm.lastname,
      },
      image_url:
        'https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM=',
      // username,
      verified_email: true,
    };
    const newUser = new this.UserModel(user);
    return await newUser.save();
  }
}
