import {
  UpdateAnswerInputModel,
  UpdateAnswerResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { AnswerRepository } from 'src/infrastructure/database/repositories';
import { UserNotApproveAnswerException } from 'src/domain/exceptions';

@Injectable({})
export class UpdateAnswerCommand
  implements BaseCommand<UpdateAnswerInputModel, UpdateAnswerResultModel>
{
  constructor(private answerRepository: AnswerRepository) {}
  async execute(
    input: UpdateAnswerInputModel,
  ): Promise<UpdateAnswerResultModel> {
    const answer = await this.answerRepository.findById(input.answerId);
    if (input.approved) {
      if (answer.question.author.id !== input.userId) {
        throw new UserNotApproveAnswerException();
      }
      answer.isApproved = input.approved;
      await this.answerRepository.save(answer);

      return new UpdateAnswerResultModel({ success: true });
    }
    answer.content = input.content;
    await this.answerRepository.save(answer);

    return new UpdateAnswerResultModel({ success: true });
  }
}
