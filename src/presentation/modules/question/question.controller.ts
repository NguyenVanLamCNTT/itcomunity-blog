import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import {
  ApprovedAnswerRequestModel,
  CreateAnswerRequestModel,
  CreateQuestionRequestModel,
  CreateQuestionResponseModel,
  GetAllAnswerRequestModel,
  GetAllAnswerResponseModel,
  GetAllCommentResponseModel,
  GetAllQuestionRequestModel,
  UpdateAnswerRequestModel,
  UpdateAnswerResponseModel,
  UpdateQuestionRequestModel,
  UpdateQuestionResponseModel,
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

  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: UpdateQuestionResponseModel,
    isArray: false,
  })
  async update(
    @Param('id') id: number,
    @Body() body: UpdateQuestionRequestModel,
  ) {
    return await this.service.updateQuestion(id, body);
  }

  @Put('/answers/:id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: UpdateAnswerResponseModel,
    isArray: false,
  })
  async updateAnswer(
    @Param('id') id: number,
    @Body() body: UpdateAnswerRequestModel,
  ) {
    return await this.service.updateAnswer(id, body);
  }

  @Patch('answers/:id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: UpdateAnswerResponseModel,
    isArray: false,
  })
  async approvedAnswer(
    @Req() req: any,
    @Param('id') id: number,
    @Body() body: ApprovedAnswerRequestModel,
  ) {
    const userId = req.user['userId'];
    return await this.service.approvedAnswer(id, userId, body);
  }
}
