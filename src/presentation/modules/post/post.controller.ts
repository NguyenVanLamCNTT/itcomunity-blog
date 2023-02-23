import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePostRequestModel,
  CreatePostResponseModel,
  GetAllPostRequestModel,
  GetAllPostResponseModel,
  GetDetailPostResponseModel,
} from 'src/presentation/models';
import { RemovePostResponseModel } from 'src/presentation/models/post/remove-post-response.model';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PostService } from './post.service';

@ApiBearerAuth()
@ApiTags('api/posts')
@Controller('api/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: CreatePostResponseModel,
    isArray: false,
  })
  create(@Body() body: CreatePostRequestModel, @Req() req: any) {
    const userId = req.user['userId'];
    return this.postService.create(body, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    type: RemovePostResponseModel,
    isArray: false,
  })
  delete(@Param('id') id: number) {
    return this.postService.delete(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllPostResponseModel,
    isArray: false,
  })
  async getAll(@Query() pageable: GetAllPostRequestModel) {
    return this.postService.getAll(pageable);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetDetailPostResponseModel,
    isArray: false,
  })
  async getById(@Param('id') id: number) {
    return this.postService.getById(id);
  }
}
