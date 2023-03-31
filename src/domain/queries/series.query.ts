import { Injectable } from '@nestjs/common';
import { SeriesRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class SeriesQuery {
  constructor(private seriesRepository: SeriesRepository) {}

  async getAll(page: number, perPage: number, sort: string) {
    return await this.seriesRepository.findAll(page, perPage, sort);
  }

  async getById(id: number) {
    return await this.seriesRepository.findById(id);
  }

  async getByUser(userId: number, page: number, perPage: number, sort: string) {
    return await this.seriesRepository.findByUser(userId, page, perPage, sort);
  }

  // async findByUsername(page: number, perPage: number, sort: string, username: string) {
  //   return await this.seriesRepository.
  // }
}
