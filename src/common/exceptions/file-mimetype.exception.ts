import { Errors } from '../../types/Errors';
import { HttpException } from '@nestjs/common';
/** Throws an error for file with a bad mimetype*/
const BadFileMimeType = (name,types:Array<string>) => {
  return new HttpException(
    Errors.BAD_FILE_TYPE(name,types),
    Errors.BAD_FILE_TYPE(name,types).status
  );
};
export default BadFileMimeType;
