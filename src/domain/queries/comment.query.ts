import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class CommentQuery {
  constructor(private commentRepository: CommentRepository) {}

  async findByPostId(postId: number, page: number, perPage: number) {
    return await this.commentRepository.findByPostId(postId, page, perPage);
  }

  async findBySeriesId(seriesId: number, page: number, perPage: number) {
    return await this.commentRepository.findBySeriesId(seriesId, page, perPage);
  }
}
