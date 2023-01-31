import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
@Injectable({})
export class RequestCorrelation {
  public static getRequestId(): string {
    return uuid();
  }
}
