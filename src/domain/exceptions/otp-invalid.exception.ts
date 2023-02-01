import { ErrorStatusConstants, MessageConstants } from '../constants';
import { BaseException } from './base.exception';

export class OTPInvalidException extends BaseException {
  constructor() {
    super(MessageConstants.OTP_INVALID, ErrorStatusConstants.OTP_INVALID);
  }
}
