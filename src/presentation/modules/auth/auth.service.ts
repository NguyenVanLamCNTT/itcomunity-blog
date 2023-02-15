import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import {
  IncorrectPassword,
  OTPInvalidException,
  UserHasNotConfirmEmailException,
  UserNotExistException,
} from 'src/domain/exceptions';
import { UserDomainService } from 'src/domain/services';
import { JwtUtil } from 'src/infrastructure/utilities';
import {
  ConfirmOTPRequestModel,
  ConfirmOTPResponseModel,
  LoginUserRequestModel,
  LoginUserResponseModel,
  RegisterUserRequestModel,
  RegisterUserResponseModel,
  ValidateOTPRequestModel,
  ValidateOTPResponseModel,
} from 'src/presentation/models';
import { RequestCorrelation } from 'src/utility';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { Cache } from 'cache-manager';
import { SendEmailConstants } from 'src/domain/constants';

@Injectable({})
export class AuthService {
  constructor(
    private jwtUtil: JwtUtil,
    private userDomainService: UserDomainService,
    private mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async register(request: RegisterUserRequestModel) {
    const password = await this.jwtUtil.generatePassword(request.password);
    const result = await this.userDomainService.createUser({
      age: request.age,
      email: request.email,
      fullName: request.fullName,
      gender: request.gender,
      password: password,
      username: request.username,
    });
    return new RegisterUserResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: result },
    });
  }

  async login(request: LoginUserRequestModel) {
    const user = await this.userDomainService.getUserByEmailOrUsername(
      request.username,
    );
    if (!user) {
      throw new UserNotExistException();
    }

    if (!user.isConfirmEmail) {
      throw new UserHasNotConfirmEmailException();
    }
    const isMatch = await bcrypt.compare(request.password, user.password);

    if (!isMatch) {
      throw new IncorrectPassword();
    }
    let accessToken = this.jwtUtil.generateAccessToken({ userId: user.id });
    let refreshToken = this.jwtUtil.generateRefreshToken({ userId: user.id });
    if (request.remember) {
      accessToken = refreshToken = this.jwtUtil.generateTokenRemember({
        userId: user.id,
      });
    }
    return new LoginUserResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        accessToken,
        refreshToken,
        isConfirmEmail: user.isConfirmEmail,
        isAdmin: user.isAdmin,
        lastLogin: user.lastLogin,
      },
    });
  }

  async sendOTPComfirm(request: ConfirmOTPRequestModel) {
    const otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    const user = await this.userDomainService.getUserByEmailOrUsername(
      request.username,
    );
    if (!user) {
      throw new UserNotExistException();
    }

    await this.mailerService.sendMail({
      to: user.email,
      subject: SendEmailConstants.SUBJECT_SEND_OTP,
      template: SendEmailConstants.NAME_FILE_TEMPLATE,
      context: {
        name: user.fullName,
        otp: otp,
      },
    });
    await this.cacheManager.set(user.email, otp);
    return new ConfirmOTPResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: true },
    });
  }

  async validateOTP(request: ValidateOTPRequestModel) {
    const otp = await this.cacheManager.get(request.email);
    if (!otp || otp !== request.otp) {
      throw new OTPInvalidException();
    }
    await this.userDomainService.confirmEmailUser(request.email);
    return new ValidateOTPResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        success: true,
      },
    });
  }
}
