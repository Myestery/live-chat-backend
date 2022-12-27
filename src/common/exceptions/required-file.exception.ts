import { Errors }  from '../../types/Errors';
import { HttpException } from '@nestjs/common';
/** Throws an error for required file that was not provided in a multipart form */
const RequiredFile = (name) => {
  throw new HttpException(
    Errors.REQUIRED_FILE(name),
    Errors.REQUIRED_FILE(name).status
  );
};
export default RequiredFile;
