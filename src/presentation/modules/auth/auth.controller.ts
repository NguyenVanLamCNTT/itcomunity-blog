import { Body, Controller, HttpCode } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ConfirmOTPRequestModel,
  ConfirmOTPResponseModel,
  LoginUserRequestModel,
  LoginUserResponseModel,
  RegisterUserRequestModel,
  RegisterUserResponseModel,
} from 'src/presentation/models';
import { AuthService } from './auth.service';

@ApiBearerAuth()
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
}
