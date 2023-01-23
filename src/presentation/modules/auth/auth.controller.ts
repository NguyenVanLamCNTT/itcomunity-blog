import { Body, Controller, HttpCode } from "@nestjs/common";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterUserRequestModel, RegisterUserResponseModel, ResponseModel } from "src/presentation/models";
import { AuthService } from "./auth.service";

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
        isArray: false
    })
    async register(@Body() body: RegisterUserRequestModel) {
        return await this.authService.register(body);
    }
}