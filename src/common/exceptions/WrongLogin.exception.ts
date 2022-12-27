import { Errors } from '../../types/Errors';
import { HttpException } from '@nestjs/common';

const WrongLogin = (): void => {
  throw new HttpException(
    {
      status: false,
      message: Errors.WRONG_LOGIN.message,
      data: {
        statusCode: Errors.WRONG_LOGIN.status,
        errorType: Errors.WRONG_LOGIN.code,
      },
    },
    Errors.WRONG_LOGIN.status,
  );
};
export default WrongLogin;