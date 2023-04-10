import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Request, Response } from 'express';
import {
  GetInfoUserResponseModel,
  GetUserRequestModel,
} from 'src/presentation/models';
import { UpdateInfoUserRequestModel } from 'src/presentation/models/users/update-info-user-request.model';
import { UpdateInfoUserResponseModel } from 'src/presentation/models/users/update-info-user-response.model';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { FollowUserRequestModel } from 'src/presentation/models/users/follow-user-request.model';
import { FollowUserResponseModel } from 'src/presentation/models/users/follow-user-response.model';

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

  @Get('user')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetInfoUserResponseModel,
    isArray: false,
  })
  async getUser(@Query() query: GetUserRequestModel) {
    return await this.userService.getUser(query.username);
  }

  @Post('user/follow')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: FollowUserResponseModel,
    isArray: false,
  })
  async followUser(@Req() req: any, @Body() body: FollowUserRequestModel) {
    const userId = req.user['userId'];
    return await this.userService.folowUser(body, userId);
  }
}
