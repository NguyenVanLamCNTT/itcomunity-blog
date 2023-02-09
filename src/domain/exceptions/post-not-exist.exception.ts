import { ErrorStatusConstants, MessageConstants } from '../constants';
import { BaseException } from './base.exception';

export class PostNotExistException extends BaseException {
  constructor() {
    super(MessageConstants.POST_NOT_EXIST, ErrorStatusConstants.POST_NOT_EXIST);
  }
}
