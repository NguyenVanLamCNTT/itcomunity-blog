"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPInvalidException = void 0;
const constants_1 = require("../constants");
const base_exception_1 = require("./base.exception");
class OTPInvalidException extends base_exception_1.BaseException {
    constructor() {
        super(constants_1.MessageConstants.OTP_INVALID, constants_1.ErrorStatusConstants.OTP_INVALID);
    }
}
exports.OTPInvalidException = OTPInvalidException;
//# sourceMappingURL=otp-invalid.exception.js.map