import { Body, Controller, HttpCode } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ConfirmOTPRequestModel,
  ConfirmOTPResponseModel,
  LoginUserRequestModel,
  LoginUserResponseModel,
  RefreshTokenResponseModel,
  RegisterUserRequestModel,
  RegisterUserResponseModel,
  ValidateOTPRequestModel,
  ValidateOTPResponseModel,
  refreshTokenRequestModel,
} from 'src/presentation/models';
import { AuthService } from './auth.service';

@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: RegisterUserResponseModel,
    isArray: false,
  })
  async register(@Body() body: RegisterUserRequestModel) {
    return await this.authService.register(body);
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: LoginUserResponseModel,
    isArray: false,
  })
  async login(@Body() body: LoginUserRequestModel) {
    return await this.authService.login(body);
  }

  @Post('send-otp')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ConfirmOTPResponseModel,
    isArray: false,
  })
  async sendOTP(@Body() body: ConfirmOTPRequestModel) {
    return await this.authService.sendOTPComfirm(body);
  }

  @Post('validate-otp')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: ValidateOTPResponseModel,
    isArray: false,
  })
  async validateOtp(@Body() body: ValidateOTPRequestModel) {
    return await this.authService.validateOTP(body);
  }

  @Post('refresh-token')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: RefreshTokenResponseModel,
    isArray: false,
  })
  async refreshToken(@Body() req: refreshTokenRequestModel) {
    return await this.authService.refreshToken(req);
  }
}
