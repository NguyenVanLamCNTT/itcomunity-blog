import {
  UpdateSeriesInputModel,
  UpdateSeriesResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { SeriesRepository } from 'src/infrastructure/database/repositories';

@Injectable({})
export class UpdateSeriesCommand
  implements BaseCommand<UpdateSeriesInputModel, UpdateSeriesResultModel>
{
  constructor(private seriesRepository: SeriesRepository) {}
  async execute(
    input: UpdateSeriesInputModel,
  ): Promise<UpdateSeriesResultModel> {
    const series = await this.seriesRepository.findById(input.seriesId);
    series.name = input.title;
    series.status = input.status;
    series.description = input.description;
    series.keywords = input.keywords;
    await this.seriesRepository.save(series);
    return new UpdateSeriesResultModel({ success: true });
  }
}
