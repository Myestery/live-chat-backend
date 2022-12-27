let ADMIN_DISABLED = {
  code: 'adminDisabled',
  message: 'This Admin has been disabled, contact super admin',
  status: 403,
},
  BUSINESS_DEACTIVATED = {
    code: 'businessDeactivated',
    message: 'Business Deactivated. Contact support for more info',
    status: 403,
  },
  BAD_FILE_TYPE = (name = '$file', types = ['image/png']) => ({
    status: 422,
    message: `${name} is not a valid file type for this resource, accepted types are ${types.join(
      ', ',
    )}`,
    code: 'badFileMimeType',
  }),
  BAD_FILE_SIZE = (name = '$file', limit = '2mb') => ({
    status: 422,
    message: `${name} is too large. Max size is ${limit}`,
    code: 'badFileSize',
  }),
  COULD_NOT_LOGIN = {
    code: 'wrongLogin',
    message: "Credentials didn't match our records",
    status: 401,
  },
  EMAIL_VERIFICATION_NEEDED = {
    code: 'emailVerificationNeeded',
    message: 'Email Verification Needed',
    status: 401,
  },
  EMAIL_VERIFICATION_EXPIRED = {
    code: 'emailVerificationExpired',
    message: 'Email Verification Expired',
    status: 401,
  },
  INCORRECT_VERIFICATION_CODE = {
    code: 'incorrectVerificationCode',
    message: 'Incorrect Verification Code',
    status: 400,
  },
  NOT_LOGGED_IN = {
    code: 'notLoggedIn',
    message: 'You need to login to access this route',
    status: 403,
  },
  USER_NOT_FOUND = {
    code: 'userNotFound',
    message: 'User not found',
    status: 404,
  },
  REQUIRED_FILE = (name = '$file') => ({
    status: 422,
    message: `Missing ${name} from multipart form`,
    code: 'requiredFile',
  }),
  VERIFICATION_CODE_EXPIRED = {
    code: 'verificationCodeExpired',
    message: 'Verification Code Expired',
    status: 401,
  },
  WRONG_LOGIN = {
    code: 'wrongLogin',
    message: 'Credentials did not match our records',
    status: 401,
  },
  EMAIL_EXISTS = {
    code: 'emailExists',
    message: `Email already exists`,
    status: 401,
  };
// export const Errors: Record<
//   string,
//   errorType | typeof BAD_FILE_SIZE | typeof BAD_FILE_TYPE
//   > = {
export const Errors = {
  ADMIN_DISABLED,
  BUSINESS_DEACTIVATED,
  COULD_NOT_LOGIN,
  EMAIL_VERIFICATION_NEEDED,
  EMAIL_VERIFICATION_EXPIRED,
  INCORRECT_VERIFICATION_CODE,
  NOT_LOGGED_IN,
  USER_NOT_FOUND,
  VERIFICATION_CODE_EXPIRED,
  BAD_FILE_SIZE,
  BAD_FILE_TYPE,
  REQUIRED_FILE,
  WRONG_LOGIN,
  EMAIL_EXISTS
};

export class ErrorDto {
  ADMIN_DISABLED: typeof ADMIN_DISABLED;

  BUSINESS_DEACTIVATED: typeof BUSINESS_DEACTIVATED;

  COULD_NOT_LOGIN: typeof COULD_NOT_LOGIN;

  EMAIL_VERIFICATION_NEEDED: typeof EMAIL_VERIFICATION_NEEDED;

  EMAIL_VERIFICATION_EXPIRED: typeof EMAIL_VERIFICATION_EXPIRED;

  INCORRECT_VERIFICATION_CODE: typeof INCORRECT_VERIFICATION_CODE;

  NOT_LOGGED_IN: typeof NOT_LOGGED_IN;

  VERIFICATION_CODE_EXPIRED: typeof VERIFICATION_CODE_EXPIRED;
  BAD_FILE_TYPE: typeof BAD_FILE_TYPE;

  BAD_FILE_SIZE: typeof BAD_FILE_SIZE;

  REQUIRED_FILE: typeof REQUIRED_FILE;
}
