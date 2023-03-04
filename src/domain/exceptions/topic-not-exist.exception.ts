import { ErrorStatusConstants, MessageConstants } from '../constants';
import { BaseException } from './base.exception';

export class TopicNotExistException extends BaseException {
  constructor() {
    super(
      MessageConstants.TOPIC_NOT_EXIST,
      ErrorStatusConstants.TOPIC_NOT_EXIST,
    );
  }
}
