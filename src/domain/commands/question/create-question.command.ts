import { Injectable } from '@nestjs/common';
import { BaseCommand } from '../base-command';
import {
  CreateQuestionInputModel,
  CreateQuestionResultModel,
} from 'src/domain/models';
import {
  QuestionRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { QuestionEntity } from 'src/infrastructure/database/entities';

@Injectable()
export class CreateQuestionCommand
  implements BaseCommand<CreateQuestionInputModel, CreateQuestionResultModel>
{
  constructor(
    private questionRepository: QuestionRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    input: CreateQuestionInputModel,
  ): Promise<CreateQuestionResultModel> {
    const user = await this.userRepository.findById(input.userId);
    const entity = new QuestionEntity({
      ...input,
      author: user,
    });
    await this.questionRepository.save(entity);
    user.questionsNumber = user.questionsNumber + 1;
    await this.userRepository.save(user);
    return new CreateQuestionResultModel({ success: true });
  }
}
