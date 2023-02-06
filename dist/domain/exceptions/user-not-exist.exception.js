"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotExistException = void 0;
const constants_1 = require("../constants");
const base_exception_1 = require("./base.exception");
class UserNotExistException extends base_exception_1.BaseException {
    constructor() {
        super(constants_1.MessageConstants.USER_NOT_EXIST, constants_1.ErrorStatusConstants.USER_NOT_EXIST);
    }
}
exports.UserNotExistException = UserNotExistException;
//# sourceMappingURL=user-not-exist.exception.js.map