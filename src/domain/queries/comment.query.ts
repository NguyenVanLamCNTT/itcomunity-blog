import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class CommentQuery {
  constructor(private commentRepository: CommentRepository) {}

  async findAll(
    page: number,
    perPage: number,
    postId: number,
    seriesId: number,
  ) {
    return await this.commentRepository.findAll(
      page,
      perPage,
      postId,
      seriesId,
    );
  }
}
