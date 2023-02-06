import { ResponseModel } from '../response.model';
declare class Response {
    success: boolean;
}
export declare class ValidateOTPResponseModel extends ResponseModel<Response> {
    data: Response;
    constructor(partial: Partial<ValidateOTPResponseModel>);
}
export {};
