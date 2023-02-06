import { ResponseModel } from '../response.model';
declare class Response {
    success: boolean;
}
export declare class ConfirmOTPResponseModel extends ResponseModel<Response> {
    data: Response;
    constructor(partial: Partial<ConfirmOTPResponseModel>);
}
export {};
