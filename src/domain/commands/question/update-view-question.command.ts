import {
  UpdateViewQuestionInputModel,
  UpdateViewQuestionResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/infrastructure/database/repositories';

@Injectable({})
export class UpdateViewQuestionCommand
  implements
    BaseCommand<UpdateViewQuestionInputModel, UpdateViewQuestionResultModel>
{
  constructor(private questionRepositpry: QuestionRepository) {}
  async execute(
    input: UpdateViewQuestionInputModel,
  ): Promise<UpdateViewQuestionResultModel> {
    const question = await this.questionRepositpry.findById(input.questionId);
    question.viewNumber = question.viewNumber + 1;
    await this.questionRepositpry.save(question);

    return new UpdateViewQuestionResultModel({ success: true });
  }
}
