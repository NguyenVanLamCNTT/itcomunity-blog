import { ErrorStatusConstants, MessageConstants } from '../constants';
import { BaseException } from './base.exception';

export class UserNotApproveAnswerException extends BaseException {
  constructor() {
    super(
      MessageConstants.USER_NOT_APPROVE_ANSWER,
      ErrorStatusConstants.USER_NOT_APPROVE_ANSWER,
    );
  }
}
