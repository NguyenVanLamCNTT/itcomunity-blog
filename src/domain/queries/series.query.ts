import { Injectable } from '@nestjs/common';
import { SeriesRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class SeriesQuery {
  constructor(private seriesRepository: SeriesRepository) {}

  async getAll(
    page: number,
    perPage: number,
    sort: string,
    username: string,
    isDeleted: boolean,
  ) {
    return await this.seriesRepository.findAll(
      page,
      perPage,
      sort,
      username,
      isDeleted,
    );
  }

  async getById(id: number) {
    return await this.seriesRepository.findById(id);
  }

  async getByUser(userId: number, page: number, perPage: number, sort: string) {
    return await this.seriesRepository.findByUser(userId, page, perPage, sort);
  }
}
