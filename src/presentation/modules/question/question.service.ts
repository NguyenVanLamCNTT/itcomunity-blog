import { Injectable } from '@nestjs/common';
import { CreateQuestionInputModel } from 'src/domain/models';
import { QuestionDomainService } from 'src/domain/services/question.domain.service';
import {
  CreateQuestionRequestModel,
  CreateQuestionResponseModel,
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
}
