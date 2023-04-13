import { Injectable } from '@nestjs/common';
import { UpdateBookmarkCommand } from '../commands';
import { BookMarkQuery } from '../queries';
import { UpdateBookmarkInputModel } from '../models';

@Injectable()
export class BookmarkDomainService {
  constructor(
    private updateBookmarkCommand: UpdateBookmarkCommand,
    private bookmarkQuery: BookMarkQuery,
  ) {}

  async updateBookmark(input: UpdateBookmarkInputModel) {
    return await this.updateBookmarkCommand.execute(input);
  }

  async getPostBookmarkByUser(
    page: number,
    perPage: number,
    sort: string,
    userId: number,
  ) {
    return await this.bookmarkQuery.getPostBookmarkByUser(
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
    return await this.bookmarkQuery.getSeriesBookmarkByUser(
      page,
      perPage,
      sort,
      userId,
    );
  }
}
