"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectPassword = void 0;
const constants_1 = require("../constants");
const base_exception_1 = require("./base.exception");
class IncorrectPassword extends base_exception_1.BaseException {
    constructor() {
        super(constants_1.MessageConstants.INCORRECT_PASSWORD, constants_1.ErrorStatusConstants.INCORRECT_PASSWORD);
    }
}
exports.IncorrectPassword = IncorrectPassword;
//# sourceMappingURL=incorrect-password.exception.js.map