import { RemoveInputModel, RemoveResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { AnswerRepository } from 'src/infrastructure/database/repositories';

@Injectable({})
export class RemoveAnswerCommand
  implements BaseCommand<RemoveInputModel, RemoveResultModel>
{
  constructor(private answerRepository: AnswerRepository) {}
  async execute(input: RemoveInputModel): Promise<RemoveResultModel> {
    const entity = await this.answerRepository.findById(input.id);
    entity.isDeleted = true;
    await this.answerRepository.save(entity);
    return { success: true };
  }
}
