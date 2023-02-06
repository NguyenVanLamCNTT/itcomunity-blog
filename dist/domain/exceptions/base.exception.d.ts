import { HttpException } from '@nestjs/common';
export declare class BaseException extends HttpException {
    constructor(message: string, statusCode: string);
}
export declare function getMessageError(status: number): string;
