import { UserDomainService } from 'src/domain/services';
import { JwtUtil } from 'src/infrastructure/utilities';
import { ConfirmOTPRequestModel, ConfirmOTPResponseModel, LoginUserRequestModel, LoginUserResponseModel, RegisterUserRequestModel, RegisterUserResponseModel, ValidateOTPRequestModel, ValidateOTPResponseModel } from 'src/presentation/models';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { Cache } from 'cache-manager';
export declare class AuthService {
    private jwtUtil;
    private userDomainService;
    private mailerService;
    private readonly cacheManager;
    constructor(jwtUtil: JwtUtil, userDomainService: UserDomainService, mailerService: MailerService, cacheManager: Cache);
    register(request: RegisterUserRequestModel): Promise<RegisterUserResponseModel>;
    login(request: LoginUserRequestModel): Promise<LoginUserResponseModel>;
    sendOTPComfirm(request: ConfirmOTPRequestModel): Promise<ConfirmOTPResponseModel>;
    validateOTP(request: ValidateOTPRequestModel): Promise<ValidateOTPResponseModel>;
}
