import { RemoveInputModel, RemoveResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { SeriesRepository } from 'src/infrastructure/database/repositories';

@Injectable({})
export class RemoveSeriesCommand
  implements BaseCommand<RemoveInputModel, RemoveResultModel>
{
  constructor(private seriesRepository: SeriesRepository) {}
  async execute(input: RemoveInputModel): Promise<RemoveResultModel> {
    const entity = await this.seriesRepository.findById(input.id);
    entity.isDeleted = true;
    await this.seriesRepository.save(entity);
    return { success: true };
  }
}
