import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/common/decorators/user.decorator';
import WrongLogin from 'src/common/exceptions/WrongLogin.exception';
import LoginDto from './dto/login-user.dto';
import CreateUserDto from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put('/update-password')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @User('_id') uid: string,
  ) {
    await this.authService.updatePassword(updatePasswordDto, uid);
    return {
      statusCode: 200,
      message: 'Password Updated Successfully',
      data: {},
    }
  }

  @Post('login')
  async login(@Body() loginForm: LoginDto, @Req() req, @Res() res) {
    let user = await this.authService.validateUser(loginForm);
    if (user) {
      let data = await this.authService.login(user);
      return res.json(data);
    }
    WrongLogin();
  }

  @Post('register')
  async register(@Body() registrationForm: CreateUserDto, @Res() res) {
    console.log('why?');
    this.authService
      .createUser(registrationForm)
      .then(async (obj) => {
        return res.status(200).json({
          statusCode: 200,
          message: 'Successfully Signed Up',
          data: {},
        });
      })
      .catch((err) => {
        let message = 'Sorry an Error Occured',
          errorType = 'unexpected',
          statusCode = 500;
        try {
          message = err.response.message;
          errorType = err.response.data.errorType;
          statusCode = 422;
        } catch (error) {
          message = 'Sorry an Error Occured';
          errorType = 'unexpected';
          statusCode = 500;
        }
        return res.status(statusCode).json({
          message,
          data: {
            errorType,
          },
          statusCode,
        });
      });
  }
}
