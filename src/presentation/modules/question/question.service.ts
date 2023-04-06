import { Injectable } from '@nestjs/common';
import {
  CreateAnswerInputModel,
  CreateQuestionInputModel,
} from 'src/domain/models';
import { QuestionDomainService } from 'src/domain/services/question.domain.service';
import {
  CreateAnswerRequestModel,
  CreateQuestionRequestModel,
  CreateQuestionResponseModel,
  GetAllCommentResponseModel,
  GetAllQuestionRequestModel,
  GetAllQuestionResponseModel,
  QuestionResponseModel,
} from 'src/presentation/models';
import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class QuestionService {
  constructor(private questionDomainService: QuestionDomainService) {}

  async create(userId: number, body: CreateQuestionRequestModel) {
    const result = await this.questionDomainService.create(
      new CreateQuestionInputModel({
        userId,
        ...body,
      }),
    );

    return new CreateQuestionResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: true },
    });
  }

  async getAll(request: GetAllQuestionRequestModel) {
    const data = await this.questionDomainService.getAll(
      request.page,
      request.perPage,
      request.sort,
      request.username,
    );

    return new GetAllQuestionResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
        items: data.items.map((item) => {
          return new QuestionResponseModel({
            ...item,
            author: {
              id: item.author.id,
              avatar: item.author.avatar,
              fullname: item.author.fullName,
              username: item.author.username,
            },
          });
        }),
      },
    });
  }

  async createAnswer(request: CreateAnswerRequestModel, userId: number) {
    const result = await this.questionDomainService.createAnswer(
      new CreateAnswerInputModel({
        ...request,
        userId,
      }),
    );

    return new CreateQuestionResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: result },
    });
  }
}
