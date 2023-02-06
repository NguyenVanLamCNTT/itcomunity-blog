import { ResponseError } from './response-error.model';
export declare class ResponseModel<TData> {
    id: string;
    data: TData;
    errors?: ResponseError;
}
