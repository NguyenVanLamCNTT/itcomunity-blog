import { Body, Controller, HttpCode, Req, UseGuards } from '@nestjs/common';
import {
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ChangePasswordRequestModel,
  ConfirmOTPRequestModel,
  ConfirmOTPResponseModel,
  LoginUserRequestModel,
  LoginUserResponseModel,
  RefreshTokenResponseModel,
  RegisterUserRequestModel,
  RegisterUserResponseModel,
  RevertDeletedRequestModel,
  ValidateOTPRequestModel,
  ValidateOTPResponseModel,
  refreshTokenRequestModel,
} from 'src/presentation/models';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

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

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  async changePassword(
    @Req() req: any,
    @Body() body: ChangePasswordRequestModel,
  ) {
    const userId = req.user['userId'];
    return this.authService.changePassword(body, userId);
  }

  @Patch('revert-deleted')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  async revertDelted(@Req() req: any, @Body() body: RevertDeletedRequestModel) {
    return this.authService.revertDeleted(body);
  }
}
