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
  Patch,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BookmarkPostRequestModel,
  CreatePostRequestModel,
  CreatePostResponseModel,
  CreatePostWithChatGPTRequestModel,
  CreatePostWithChatGPTResponseModel,
  GetAllPostRequestModel,
  GetAllPostResponseModel,
  GetDetailPostResponseModel,
  GetPostByUsernameRequestModel,
  UpdatePostRequestModel,
  UpdateViewPostRequestModel,
  UpdateViewPostResponseModel,
} from 'src/presentation/models';
import { RemovePostResponseModel } from 'src/presentation/models/post/remove-post-response.model';
import { JwtAuthGuard } from '../auth/auth.guard';
import { PostService } from './post.service';
import { BaseFilterGetListModel } from 'src/presentation/models/base-filter-get-list.model';

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
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetDetailPostResponseModel,
    isArray: false,
  })
  async getById(@Param('id') id: number) {
    return this.postService.getById(id);
  }

  @Get('users/user-follow')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllPostResponseModel,
    isArray: false,
  })
  @UseGuards(JwtAuthGuard)
  async getAllByUserFollow(
    @Query() pageable: GetAllPostRequestModel,
    @Req() req: any,
  ) {
    const userId = req.user['userId'];
    return this.postService.getAllByUserFollow(pageable, userId);
  }

  @Get('series/:seriesId')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllPostResponseModel,
    isArray: false,
  })
  async getAllBySeries(
    @Param('seriesId') seriesId: number,
    @Query() pageable: GetAllPostRequestModel,
  ) {
    return await this.postService.getAllBySeries(seriesId, pageable);
  }

  @Post('/chat-gpt/post')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: CreatePostWithChatGPTResponseModel,
    isArray: false,
  })
  async createPostWithChatGPT(@Body() body: CreatePostWithChatGPTRequestModel) {
    return await this.postService.createPostWithChatGPT(body);
  }

  @Get('me/author')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: GetAllPostResponseModel,
    isArray: false,
  })
  async getByUser(@Query() pageable: GetAllPostRequestModel, @Req() req: any) {
    const userId = req.user['userId'];
    return await this.postService.getByUser(userId, pageable);
  }

  @Patch('view')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: UpdateViewPostResponseModel,
    isArray: false,
  })
  async updateView(@Body() body: UpdateViewPostRequestModel) {
    return await this.postService.updateViewPost(body);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: CreatePostResponseModel,
    isArray: false,
  })
  async update(@Param('id') id: number, @Body() body: UpdatePostRequestModel) {
    return this.postService.updatePost(id, body);
  }

  @Post('/bookmark')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: CreatePostResponseModel,
    isArray: false,
  })
  async bookmark(@Req() req: any, @Body() body: BookmarkPostRequestModel) {
    const userId = req.user['userId'];
    return await this.postService.bookmarkPost(userId, body);
  }

  @Get('/bookmark/user')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: GetAllPostResponseModel,
    isArray: false,
  })
  async getBookmark(
    @Req() req: any,
    @Query() pageable: BaseFilterGetListModel,
  ) {
    const userId = req.user['userId'];
    return this.postService.getPostBookmark(userId, pageable);
  }
}
