import { ResponseModel } from '../response.model';
declare class Response {
    accessToken: string;
    refreshToken: string;
    isConfirmEmail: boolean;
    isAdmin: boolean;
    lastLogin: Date;
}
export declare class LoginUserResponseModel extends ResponseModel<Response> {
    data: Response;
    constructor(partial: Partial<LoginUserResponseModel>);
}
export {};
