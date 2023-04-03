import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AddCommentRequestModel,
  AddCommentResponseModel,
} from 'src/presentation/models';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CommentService } from './comment.service';

@ApiBearerAuth()
@ApiTags('api/comments')
@Controller('api/comments')
export class CommentController {
  constructor(private service: CommentService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: AddCommentResponseModel,
    isArray: false,
  })
  async create(@Req() req: any, @Body() body: AddCommentRequestModel) {
    const userId = req.user['userId'];

    return await this.service.create(body, userId);
  }
}
