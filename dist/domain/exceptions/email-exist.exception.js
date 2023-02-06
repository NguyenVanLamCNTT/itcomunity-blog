"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailExistException = void 0;
const constants_1 = require("../constants");
const base_exception_1 = require("./base.exception");
class EmailExistException extends base_exception_1.BaseException {
    constructor() {
        super(constants_1.MessageConstants.EMAIL_EXIST, constants_1.ErrorStatusConstants.EMAIL_EXIST);
    }
}
exports.EmailExistException = EmailExistException;
//# sourceMappingURL=email-exist.exception.js.map