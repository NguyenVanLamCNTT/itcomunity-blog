import { ConfirmOTPRequestModel, ConfirmOTPResponseModel, LoginUserRequestModel, LoginUserResponseModel, RegisterUserRequestModel, RegisterUserResponseModel, ValidateOTPRequestModel, ValidateOTPResponseModel } from 'src/presentation/models';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterUserRequestModel): Promise<RegisterUserResponseModel>;
    login(body: LoginUserRequestModel): Promise<LoginUserResponseModel>;
    sendOTP(body: ConfirmOTPRequestModel): Promise<ConfirmOTPResponseModel>;
    validateOtp(body: ValidateOTPRequestModel): Promise<ValidateOTPResponseModel>;
}
