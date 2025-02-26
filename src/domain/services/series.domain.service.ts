import { Injectable } from '@nestjs/common';
import {
  AddNewSeriesCommand,
  RemoveSeriesCommand,
  UpdatePostFromSeriesCommand,
  UpdateSeriesCommand,
} from '../commands';
import {
  AddNewSeriesInputModel,
  UpdatePostFromSeriesInputModel,
  UpdateSeriesInputModel,
} from '../models';
import { SeriesQuery } from '../queries/series.query';

@Injectable()
export class SeriesDomainService {
  constructor(
    private addNewSeriesCommand: AddNewSeriesCommand,
    private seriesQuery: SeriesQuery,
    private updateSeriesCommand: UpdateSeriesCommand,
    private updatePostFromSeriesCommand: UpdatePostFromSeriesCommand,
    private removeSeriesCommand: RemoveSeriesCommand,
  ) {}

  async create(input: AddNewSeriesInputModel) {
    const result = await this.addNewSeriesCommand.execute(input);
    return result.success;
  }

  async getAll(
    page: number,
    perPage: number,
    sort: string,
    username: string,
    isDeleted: boolean,
  ) {
    return await this.seriesQuery.getAll(
      page,
      perPage,
      sort,
      username,
      isDeleted,
    );
  }

  async getId(id: number) {
    return await this.seriesQuery.getById(id);
  }

  async getByUser(userId: number, page: number, perPage: number, sort: string) {
    return await this.seriesQuery.getByUser(userId, page, perPage, sort);
  }

  async updateSeries(input: UpdateSeriesInputModel) {
    return await this.updateSeriesCommand.execute(input);
  }

  async updatePostFromSeries(input: UpdatePostFromSeriesInputModel) {
    return await this.updatePostFromSeriesCommand.execute(input);
  }

  async remove(id: number) {
    return this.removeSeriesCommand.execute({ id });
  }
}
