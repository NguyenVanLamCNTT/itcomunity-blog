import { Injectable } from '@nestjs/common';
import { CreateQuestionCommand } from '../commands';
import { CreateQuestionInputModel } from '../models';
import { QuestionQuery } from '../queries';

@Injectable()
export class QuestionDomainService {
  constructor(
    private createQuestionCommand: CreateQuestionCommand,
    private questionQuery: QuestionQuery,
  ) {}

  async create(input: CreateQuestionInputModel) {
    const result = await this.createQuestionCommand.execute(input);
    return result.success;
  }

  async getAll(page: number, perPage: number, sort: string, username: string) {
    return await this.questionQuery.getAll(page, perPage, sort, username);
  }
}
