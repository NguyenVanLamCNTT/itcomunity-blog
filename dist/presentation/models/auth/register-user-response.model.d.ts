import { ResponseModel } from '../response.model';
declare class Response {
    success: boolean;
}
export declare class RegisterUserResponseModel extends ResponseModel<Response> {
    data: Response;
    constructor(partial: Partial<RegisterUserResponseModel>);
}
export {};
