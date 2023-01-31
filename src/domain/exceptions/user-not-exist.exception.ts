import { ErrorStatusConstants, MessageConstants } from '../constants';
import { BaseException } from './base.exception';

export class UserNotExistException extends BaseException {
  constructor() {
    super(MessageConstants.USER_NOT_EXIST, ErrorStatusConstants.USER_NOT_EXIST);
  }
}
