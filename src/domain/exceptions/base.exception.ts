import { HttpException } from '@nestjs/common';
import { ResponseError, ResponseErrorItem } from 'src/presentation/models';
import { RequestCorrelation } from 'src/utility';

export class BaseException extends HttpException {
  constructor(message: string, statusCode: string) {
    super(
      {
        id: RequestCorrelation.getRequestId(),
        errors: new ResponseError({
          code: parseInt(statusCode.slice(0, 3)),
          message: getMessageError(parseInt(statusCode.slice(0, 3))),
          errors: [
            new ResponseErrorItem({
              reason: statusCode,
              message: message,
            }),
          ],
        }),
      },
      parseInt(statusCode.slice(0, 3)),
    );
  }
}

export function getMessageError(status: number): string {
  if (status === 404) {
    return 'NOT FOUND!';
  } else if (status === 409) {
    return 'CONFLICT!';
  } else if (status === 400) {
    return 'BAD REQUEST!';
  } else if (status === 401) {
    return ' UNAUTHORIZED';
  } else if (status === 403) {
    return 'FORBIDDEN!';
  } else {
    return 'INTERNAL SERVER ERROR!';
  }
}
