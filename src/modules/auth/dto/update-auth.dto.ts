import { PartialType } from '@nestjs/mapped-types';
import { UpdatePasswordDto } from './update-password.dto';

export class UpdateAuthDto extends PartialType(UpdatePasswordDto) {}
