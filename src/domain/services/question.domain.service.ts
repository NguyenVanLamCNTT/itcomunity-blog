import { Injectable } from '@nestjs/common';
import { CreateAnswerCommand, CreateQuestionCommand } from '../commands';
import { CreateAnswerInputModel, CreateQuestionInputModel } from '../models';
import { AnswerQuery, QuestionQuery } from '../queries';

@Injectable()
export class QuestionDomainService {
  constructor(
    private createQuestionCommand: CreateQuestionCommand,
    private questionQuery: QuestionQuery,
    private createAnswerCommand: CreateAnswerCommand,
    private answerQuery: AnswerQuery,
  ) {}

  async create(input: CreateQuestionInputModel) {
    const result = await this.createQuestionCommand.execute(input);
    return result.success;
  }

  async getAll(page: number, perPage: number, sort: string, username: string) {
    return await this.questionQuery.getAll(page, perPage, sort, username);
  }

  async createAnswer(input: CreateAnswerInputModel) {
    return (await this.createAnswerCommand.execute(input)).success;
  }

  async getAllAnswer(
    page: number,
    perPage: number,
    sort: string,
    questionId: number,
  ) {
    return await this.answerQuery.findAll(page, perPage, sort, questionId);
  }

  async getQuestionById(id: number) {
    return await this.questionQuery.getById(id);
  }
}
