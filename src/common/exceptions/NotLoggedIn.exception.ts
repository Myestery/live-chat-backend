import {Errors} from '../../types/Errors';
import { HttpException } from '@nestjs/common';

const NotLoggedIn = (): void => {
  throw new HttpException(
    {
      status: false,
      message: Errors.NOT_LOGGED_IN.message,
      data: {
        statusCode: Errors.NOT_LOGGED_IN.status,
        errorType: Errors.NOT_LOGGED_IN.code,
      },
    },
    Errors.NOT_LOGGED_IN.status,
  );
};
export default NotLoggedIn;
