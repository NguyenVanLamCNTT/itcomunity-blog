import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AddTopicToUserRequestModel,
  AddTopicToUserResponseMode,
  CreateTopicRequestModel,
  CreateTopicResponseModel,
  GetAllTopicRequestModel,
  GetAllTopicResponseModel,
} from 'src/presentation/models';
import { JwtAuthGuard } from '../auth/auth.guard';
import { TopicService } from './topic.service';

@ApiBearerAuth()
@ApiTags('api/topics')
@Controller('api/topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllTopicResponseModel,
    isArray: false,
  })
  async getAll(@Query() pageable: GetAllTopicRequestModel) {
    return this.topicService.getAll(pageable);
  }

  @Post('add-topic-to-user')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: AddTopicToUserResponseMode,
    isArray: false,
  })
  async addTopicToUser(
    @Body() body: AddTopicToUserRequestModel,
    @Req() req: any,
  ) {
    const userId = req.user['userId'];
    return await this.topicService.addUserToTopic(body, userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: CreateTopicResponseModel,
    isArray: false,
  })
  async create(@Body() body: CreateTopicRequestModel) {
    return await this.topicService.create(body);
  }

  @Post('remove-topic-to-user')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: AddTopicToUserResponseMode,
    isArray: false,
  })
  async removeTopicToUser(
    @Body() body: AddTopicToUserRequestModel,
    @Req() req: any,
  ) {
    const userId = req.user['userId'];
    return await this.topicService.removeUserToTopic(body, userId);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: CreateTopicResponseModel,
    isArray: false,
  })
  async remove(@Param('id') id: number) {
    return await this.topicService.removeTopic(id);
  }
}
