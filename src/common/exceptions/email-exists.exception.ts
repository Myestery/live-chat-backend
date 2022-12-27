import { HttpException } from '@nestjs/common';
import { Errors } from 'src/types/Errors';

/** Throws an error for users that try to sign up with an email that already exists on mysario */
const EmailExists = () => {
  throw new HttpException(Errors.EMAIL_EXISTS, Errors.EMAIL_EXISTS.status);
};
export default EmailExists;
