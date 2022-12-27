import { Errors } from '../../types/Errors';
import { HttpException } from '@nestjs/common';
/** Throws an error for files that are too big */
const BadFileSize = (name,limit) => {
  return new HttpException(
    Errors.BAD_FILE_SIZE(name,limit),
    Errors.BAD_FILE_SIZE(name,limit).status
  );
};
export default BadFileSize;
