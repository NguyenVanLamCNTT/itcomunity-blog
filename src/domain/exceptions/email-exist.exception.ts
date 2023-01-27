import { ErrorStatusConstants, MessageConstants } from "../constants";
import { BaseException } from "./base.exception";

export class EmailExistException extends BaseException{
    constructor() {
       super(MessageConstants.EMAIL_EXIST, ErrorStatusConstants.EMAIL_EXIST); 
    }
}