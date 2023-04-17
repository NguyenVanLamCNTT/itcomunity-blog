import { Injectable } from '@nestjs/common';
import { BookmarkRepository } from 'src/infrastructure/database/repositories';

@Injectable()
export class BookMarkQuery {
  constructor(private bookmarRepository: BookmarkRepository) {}

  async getPostBookmarkByUser(
    page: number,
    perPage: number,
    sort: string,
    userId: number,
  ) {
    return await this.bookmarRepository.findByUserIdAndPostId(
      page,
      perPage,
      sort,
      userId,
    );
  }

  async getSeriesBookmarkByUser(
    page: number,
    perPage: number,
    sort: string,
    userId: number,
  ) {
    return await this.bookmarRepository.findByUserIdAndSeriesId(
      page,
      perPage,
      sort,
      userId,
    );
  }

  async findByUserAndPost(userId: number, postId: number) {
    return await this.bookmarRepository.findByUserAndPost(userId, postId);
  }

  async findByUserAndSeries(userId: number, seriesId: number) {
    return await this.bookmarRepository.findByUserAndSeries(userId, seriesId);
  }
}
