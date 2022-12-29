import { MiddlewareConsumer, Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { BookmarkModule } from '../bookmark/bookmark.module';
import { CallModule } from '../call/call.module';
import { ChannelModule } from '../channel/channel.module';
import { ChatModule } from '../chat/chat.module';
import { ContactModule } from '../contact/contact.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { Firebase } from '../firebase/providers/firebase';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';

const dotenv = require('dotenv');
dotenv.config();
@Module({
  imports: [
    AuthModule,
    BookmarkModule,
    CallModule,
    ChatModule,
    ChannelModule,
    ContactModule,
    ProfileModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  // exports: [Firebase],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
