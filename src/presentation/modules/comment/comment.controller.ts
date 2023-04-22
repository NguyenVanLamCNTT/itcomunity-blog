import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AddCommentRequestModel,
  AddCommentResponseModel,
  GetAllCommentRequestModel,
  RemovePostResponseModel,
  UpdateCommentRequestModel,
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

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: RemovePostResponseModel,
    isArray: false,
  })
  async remove(@Param('id') id: number) {
    return await this.service.remove(id);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: RemovePostResponseModel,
    isArray: false,
  })
  async update(
    @Param('id') id: number,
    @Body() body: UpdateCommentRequestModel,
  ) {
    return await this.service.update(body, id);
  }
}
