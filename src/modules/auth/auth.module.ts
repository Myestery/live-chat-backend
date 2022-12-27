import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseModule } from 'src/modules/firebase/firebase.module';
import { Module } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/entities/user.schema';
require('dotenv').config();
let pass = process.env.JWT_SECRET_KEY;
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    FirebaseModule,
    JwtModule.register({
      secret: `${pass}`,
      signOptions: { expiresIn: '500d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AuthModule {}
