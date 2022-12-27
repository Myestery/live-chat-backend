import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
export default class LoginDto {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
