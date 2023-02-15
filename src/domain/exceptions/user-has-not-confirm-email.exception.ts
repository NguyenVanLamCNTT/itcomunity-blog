import { ErrorStatusConstants, MessageConstants } from '../constants';
import { BaseException } from './base.exception';

export class UserHasNotConfirmEmailException extends BaseException {
  constructor() {
    super(
      MessageConstants.USER_HAS_NOT_CONFIRMED_EMAIL,
      ErrorStatusConstants.USER_HAS_NOT_CONFIRMED_EMAIL,
    );
  }
}
