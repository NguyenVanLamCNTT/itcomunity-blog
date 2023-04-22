import { RemoveInputModel, RemoveResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/infrastructure/database/repositories';

@Injectable({})
export class RemoveQuestionCommand
  implements BaseCommand<RemoveInputModel, RemoveResultModel>
{
  constructor(private questionRepository: QuestionRepository) {}
  async execute(input: RemoveInputModel): Promise<RemoveResultModel> {
    const entity = await this.questionRepository.findById(input.id);
    entity.isDeleted = true;
    await this.questionRepository.save(entity);

    return { success: true };
  }
}
