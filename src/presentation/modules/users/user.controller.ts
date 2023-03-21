import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Request, Response } from 'express';
import { GetInfoUserResponseModel } from 'src/presentation/models';
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
}
