import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('api/users')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getUserDeltail(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.userService.getAllUser();
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
}
