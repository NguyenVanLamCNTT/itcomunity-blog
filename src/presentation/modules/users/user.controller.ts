import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Request, Response } from 'express';
import { GetInfoUserResponseModel } from 'src/presentation/models';
import { UpdateInfoUserRequestModel } from 'src/presentation/models/users/update-info-user-request.model';
import { UpdateInfoUserResponseModel } from 'src/presentation/models/users/update-info-user-response.model';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('api/users')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getUserDeltail(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.userService.getAllUser();
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  @Get('me/info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetInfoUserResponseModel,
    isArray: false,
  })
  async getInfo(@Req() req: any) {
    const userId = req.user['userId'];
    return await this.userService.getInfo(userId);
  }

  @Put('me/info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: UpdateInfoUserResponseModel,
    isArray: false,
  })
  async updateinfo(@Body() body: UpdateInfoUserRequestModel, @Req() req: any) {
    const userId = req.user['userId'];
    return await this.userService.updateInfoUser(body, userId);
  }
}
