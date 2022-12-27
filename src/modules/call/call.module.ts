import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Call, CallSchema } from './entities/call.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Call.name, schema: CallSchema }]),
  ],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
