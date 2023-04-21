import { Injectable } from '@nestjs/common';
import {
  CreateAnswerInputModel,
  CreateQuestionInputModel,
} from 'src/domain/models';
import { QuestionDomainService } from 'src/domain/services/question.domain.service';
import {
  AnswerResponseModel,
  ApprovedAnswerRequestModel,
  CreateAnswerRequestModel,
  CreateQuestionRequestModel,
  CreateQuestionResponseModel,
  GetAllAnswerRequestModel,
  GetAllAnswerResponseModel,
  GetAllCommentResponseModel,
  GetAllQuestionRequestModel,
  GetAllQuestionResponseModel,
  GetDetailQuestionResponseModel,
  QuestionResponseModel,
  UpdateAnswerRequestModel,
  UpdateAnswerResponseModel,
  UpdateQuestionRequestModel,
  UpdateQuestionResponseModel,
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
      request.search,
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

  async findAllAnswer(questionId: number, request: GetAllAnswerRequestModel) {
    const data = await this.questionDomainService.getAllAnswer(
      request.page,
      request.perPage,
      request.sort,
      questionId,
    );

    return new GetAllAnswerResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
        items: data.items.map((item) => {
          return new AnswerResponseModel({
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

  async getQuestionById(id: number) {
    const data = await this.questionDomainService.getQuestionById(id);
    return new GetDetailQuestionResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: new QuestionResponseModel({
        ...data,
        author: {
          id: data.author.id,
          avatar: data.author.avatar,
          fullname: data.author.fullName,
          username: data.author.username,
        },
      }),
    });
  }

  async updateQuestion(
    questionId: number,
    request: UpdateQuestionRequestModel,
  ) {
    const data = await this.questionDomainService.updateQuestion({
      id: questionId,
      ...request,
    });

    return new UpdateQuestionResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: data },
    });
  }

  async updateAnswer(answerId: number, req: UpdateAnswerRequestModel) {
    const result = await this.questionDomainService.updateAnswer(
      req.content,
      answerId,
    );

    return new UpdateAnswerResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: result,
    });
  }

  async approvedAnswer(
    answerId: number,
    userId: number,
    req: ApprovedAnswerRequestModel,
  ) {
    const result = await this.questionDomainService.approvedAnswer(
      answerId,
      req.approved,
      userId,
    );
    return new UpdateAnswerResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: result,
    });
  }
}
