import { ErrorStatusConstants, MessageConstants } from "../constants";
import { BaseException } from "./base.exception";

export class GenderNotExistException extends BaseException{
    constructor() {
        super(MessageConstants.GENDER_NOT_EXIST, ErrorStatusConstants.GENDER_NOT_EXIST);
    }
}