import { IsNotEmpty, isString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  confirmpassword: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  oldPassword: string;
}
