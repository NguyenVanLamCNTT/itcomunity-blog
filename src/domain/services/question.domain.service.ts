import { Injectable } from '@nestjs/common';
import { CreateQuestionCommand } from '../commands';
import { CreateQuestionInputModel } from '../models';

@Injectable()
export class QuestionDomainService {
  constructor(private createQuestionCommand: CreateQuestionCommand) {}

  async create(input: CreateQuestionInputModel) {
    const result = await this.createQuestionCommand.execute(input);
    return result.success;
  }
}
