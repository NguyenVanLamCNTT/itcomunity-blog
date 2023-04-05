import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import {
  CreateQuestionRequestModel,
  CreateQuestionResponseModel,
  GetAllCommentResponseModel,
  GetAllQuestionRequestModel,
} from 'src/presentation/models';

@ApiBearerAuth()
@ApiTags('api/questions')
@Controller('api/questions')
export class QuestionController {
  constructor(private service: QuestionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: CreateQuestionResponseModel,
    isArray: false,
  })
  async create(@Req() req: any, @Body() body: CreateQuestionRequestModel) {
    const userId = req.user['userId'];
    return await this.service.create(userId, body);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: GetAllCommentResponseModel,
    isArray: false,
  })
  async getAll(@Query() query: GetAllQuestionRequestModel) {
    return await this.service.getAll(query);
  }
}
