import { IsNotEmpty } from 'class-validator';
export default class JwtPayload {
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly meta: {
    [key: string]: any;
  };
  readonly admin?: boolean;
}
