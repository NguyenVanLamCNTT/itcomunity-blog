"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageError = exports.BaseException = void 0;
const common_1 = require("@nestjs/common");
const models_1 = require("../../presentation/models");
const utility_1 = require("../../utility");
class BaseException extends common_1.HttpException {
    constructor(message, statusCode) {
        super({
            id: utility_1.RequestCorrelation.getRequestId(),
            errors: new models_1.ResponseError({
                code: parseInt(statusCode.slice(0, 3)),
                message: getMessageError(parseInt(statusCode.slice(0, 3))),
                errors: [
                    new models_1.ResponseErrorItem({
                        reason: statusCode,
                        message: message,
                    }),
                ],
            }),
        }, parseInt(statusCode.slice(0, 3)));
    }
}
exports.BaseException = BaseException;
function getMessageError(status) {
    if (status === 404) {
        return 'NOT FOUND!';
    }
    else if (status === 409) {
        return 'CONFLICT!';
    }
    else if (status === 400) {
        return 'BAD REQUEST!';
    }
    else if (status === 401) {
        return ' UNAUTHORIZED';
    }
    else if (status === 403) {
        return 'FORBIDDEN!';
    }
    else {
        return 'INTERNAL SERVER ERROR!';
    }
}
exports.getMessageError = getMessageError;
//# sourceMappingURL=base.exception.js.map