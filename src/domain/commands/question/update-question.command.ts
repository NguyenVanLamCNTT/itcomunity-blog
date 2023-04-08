import {
  UpdateQuestionInputModel,
  UpdateQuestionResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class UpdateQuestionCommand
  implements BaseCommand<UpdateQuestionInputModel, UpdateQuestionResultModel>
{
  constructor(private questionRepository: QuestionRepository) {}
  async execute(
    input: UpdateQuestionInputModel,
  ): Promise<UpdateQuestionResultModel> {
    const question = await this.questionRepository.findById(input.id);
    question.content = input.content;
    question.keywords = input.keywords;
    question.title = input.title;
    await this.questionRepository.save(question);

    return new UpdateQuestionResultModel({ success: true });
  }
}
