import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  IsOptional,
} from 'class-validator';
export default class CreateUserDto {
  @IsString()
  @Length(6)
  readonly password: string;
  @IsEmail()
  readonly email: string;
 @IsString()
  readonly firstname: string;
 @IsString()
  readonly lastname: string;
}
