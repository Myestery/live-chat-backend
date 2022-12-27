import { AppModule } from 'src/modules/app/app.module';
import { NestFactory } from '@nestjs/core';
import * as mongoose from 'mongoose';
require('dotenv').config();
async function bootstrap() {
  mongoose.set('debug',true);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4500);
}
bootstrap();
