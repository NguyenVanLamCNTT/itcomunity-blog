"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderNotExistException = void 0;
const constants_1 = require("../constants");
const base_exception_1 = require("./base.exception");
class GenderNotExistException extends base_exception_1.BaseException {
    constructor() {
        super(constants_1.MessageConstants.GENDER_NOT_EXIST, constants_1.ErrorStatusConstants.GENDER_NOT_EXIST);
    }
}
exports.GenderNotExistException = GenderNotExistException;
//# sourceMappingURL=gender-not-exist.exception.js.map