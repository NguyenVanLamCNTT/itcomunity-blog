import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class QuestionQuery {
  constructor(private questionRepository: QuestionRepository) {}

  async getAll(
    page: number,
    perPage: number,
    sort: string,
    username: string,
    search?: string,
    isDeleted?: boolean,
  ) {
    return this.questionRepository.getAll(
      page,
      perPage,
      sort,
      username,
      search,
      isDeleted,
    );
  }

  async getById(id: number) {
    return await this.questionRepository.findById(id);
  }
}
