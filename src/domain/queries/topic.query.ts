import { Injectable } from '@nestjs/common';
import { TopicRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class TopicQuery {
  constructor(private topicRepository: TopicRepository) {}

  async findAll(page: number, perPage: number, sort: string, search?: string) {
    return await this.topicRepository.findAll(page, perPage, sort, search);
  }
}
