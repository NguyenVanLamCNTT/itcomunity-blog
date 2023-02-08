import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePostRequestModel,
  CreatePostResponseModel,
} from 'src/presentation/models';
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
}
