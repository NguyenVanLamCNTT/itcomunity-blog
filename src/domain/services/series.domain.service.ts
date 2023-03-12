import { Injectable } from '@nestjs/common';
import { AddNewSeriesCommand } from '../commands';
import { AddNewSeriesInputModel } from '../models';
import { SeriesQuery } from '../queries/series.query';

@Injectable()
export class SeriesDomainService {
  constructor(
    private addNewSeriesCommand: AddNewSeriesCommand,
    private seriesQuery: SeriesQuery,
  ) {}

  async create(input: AddNewSeriesInputModel) {
    const result = await this.addNewSeriesCommand.execute(input);
    return result.success;
  }

  async getAll(page: number, perPage: number, sort: string) {
    return await this.seriesQuery.getAll(page, perPage, sort);
  }

  async getId(id: number) {
    return await this.seriesQuery.getById(id);
  }
}
