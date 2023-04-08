import {
  CreateAnswerInputModel,
  CreateAnswerResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import {
  AnswerRepository,
  QuestionRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { AnswerEntity } from 'src/infrastructure/database/entities';

@Injectable({})
export class CreateAnswerCommand
  implements BaseCommand<CreateAnswerInputModel, CreateAnswerResultModel>
{
  constructor(
    private answerRepository: AnswerRepository,
    private userRepository: UserRepository,
    private questionRepository: QuestionRepository,
  ) {}
  async execute(
    input: CreateAnswerInputModel,
  ): Promise<CreateAnswerResultModel> {
    const question = await this.questionRepository.findById(input.questionId);
    const user = await this.userRepository.findById(input.userId);

    const entity = new AnswerEntity({
      question,
      author: user,
      content: input.content,
    });

    question.answerNumber = question.answerNumber + 1;
    await this.questionRepository.save(question);
    await this.answerRepository.save(entity);
    return new CreateAnswerResultModel({ success: true });
  }
}
