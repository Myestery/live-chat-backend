import { Errors } from '../../types/Errors';
import { HttpException } from '@nestjs/common';

const UserNotFound = (): void => {
  throw new HttpException(
    {
      status: false,
      message: Errors.USER_NOT_FOUND.message,
      data: {
        statusCode: Errors.USER_NOT_FOUND.status,
        errorType: Errors.USER_NOT_FOUND.code,
      },
    },
    Errors.USER_NOT_FOUND.status,
  );
};
export default UserNotFound;
