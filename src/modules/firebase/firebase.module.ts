import { Firebase } from './providers/firebase';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  exports: [Firebase],
  providers: [Firebase],
})
export class FirebaseModule {}
