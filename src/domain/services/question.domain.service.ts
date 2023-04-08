import { Injectable } from '@nestjs/common';
import {
  CreateAnswerCommand,
  CreateQuestionCommand,
  UpdateAnswerCommand,
  UpdateQuestionCommand,
  UpdateViewQuestionCommand,
} from '../commands';
import {
  CreateAnswerInputModel,
  CreateQuestionInputModel,
  UpdateQuestionInputModel,
} from '../models';
import { AnswerQuery, QuestionQuery } from '../queries';

@Injectable()
export class QuestionDomainService {
  constructor(
    private createQuestionCommand: CreateQuestionCommand,
    private questionQuery: QuestionQuery,
    private createAnswerCommand: CreateAnswerCommand,
    private answerQuery: AnswerQuery,
    private updateViewQuestionCommand: UpdateViewQuestionCommand,
    private updateQuestionCommand: UpdateQuestionCommand,
    private updateAnswerCommand: UpdateAnswerCommand,
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
    await this.updateViewQuestionCommand.execute({ questionId: id });
    return await this.questionQuery.getById(id);
  }

  async updateQuestion(input: UpdateQuestionInputModel) {
    return (await this.updateQuestionCommand.execute(input)).success;
  }

  async updateAnswer(content: string, answerId: number) {
    return await this.updateAnswerCommand.execute({ answerId, content });
  }

  async approvedAnswer(answerId: number, approved: boolean, userId: number) {
    return await this.updateAnswerCommand.execute({
      answerId,
      userId,
      approved,
    });
  }
}
