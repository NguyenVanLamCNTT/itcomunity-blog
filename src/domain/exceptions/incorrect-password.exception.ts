import { ErrorStatusConstants, MessageConstants } from '../constants';
import { BaseException } from './base.exception';

export class IncorrectPassword extends BaseException {
  constructor() {
    super(
      MessageConstants.INCORRECT_PASSWORD,
      ErrorStatusConstants.INCORRECT_PASSWORD,
    );
  }
}
