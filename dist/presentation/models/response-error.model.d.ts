import { ResponseErrorItem } from './response-error-item.model';
export declare class ResponseError {
    code: number;
    message: string;
    errors: [ResponseErrorItem];
    constructor(partial: Partial<ResponseError>);
}
