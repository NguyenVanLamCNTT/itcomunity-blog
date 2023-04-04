import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AddCommentRequestModel,
  AddCommentResponseModel,
  GetAllCommentRequestModel,
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

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: AddCommentResponseModel,
    isArray: false,
  })
  async getByPostId(@Query() query: GetAllCommentRequestModel) {
    return await this.service.getAll(query);
  }
}
