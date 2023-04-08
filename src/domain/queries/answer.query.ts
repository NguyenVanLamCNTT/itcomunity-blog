import { Injectable } from '@nestjs/common';
import { AnswerRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class AnswerQuery {
  constructor(private answerRepository: AnswerRepository) {}

  async findAll(
    page: number,
    perPage: number,
    sort: string,
    questionId: number,
  ) {
    return await this.answerRepository.findAll(page, perPage, sort, questionId);
  }
}
