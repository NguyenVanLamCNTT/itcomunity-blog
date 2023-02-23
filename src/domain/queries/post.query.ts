import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class PostQuery {
  constructor(private postRepository: PostRepository) {}

  async findAll(page: number, perPage: number, sort: string) {
    return await this.postRepository.findAll(page, perPage, sort);
  }

  async findById(id: number) {
    return await this.postRepository.findById(id);
  }
}
