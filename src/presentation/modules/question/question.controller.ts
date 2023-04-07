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
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import {
  CreateAnswerRequestModel,
  CreateQuestionRequestModel,
  CreateQuestionResponseModel,
  GetAllAnswerRequestModel,
  GetAllAnswerResponseModel,
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

  @Post('/answers')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: GetAllCommentResponseModel,
    isArray: false,
  })
  async createAnswer(@Req() req: any, @Body() body: CreateAnswerRequestModel) {
    const userId = req.user['userId'];
    return this.service.createAnswer(body, userId);
  }

  @Get(':id/answer')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    type: GetAllAnswerResponseModel,
    isArray: false,
  })
  async getAllAnswer(
    @Query() query: GetAllAnswerRequestModel,
    @Param('id') id: number,
  ) {
    return await this.service.findAllAnswer(id, query);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    type: GetAllAnswerResponseModel,
    isArray: false,
  })
  async getById(@Param('id') id: number) {
    return await this.service.getQuestionById(id);
  }
}
