import { InjectRepository } from '@nestjs/typeorm';
import { BookmarkEntity } from '../entities';
import { IsNull, Not, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';

export class BookmarkRepository {
  constructor(
    @InjectRepository(BookmarkEntity)
    private repository: Repository<BookmarkEntity>,
  ) {}

  async save(entity: BookmarkEntity) {
    await this.repository.save(entity);
  }

  async findByUserIdAndPostId(
    page: number,
    perPage: number,
    sort: string,
    userId: number,
  ) {
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
    return await paginate<BookmarkEntity>(
      this.repository,
      { page, limit: perPage },
      {
        where: {
          user: {
            id: userId,
          },
          post: Not(IsNull()),
        },
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async findByUserIdAndSeriesId(
    page: number,
    perPage: number,
    sort: string,
    userId: number,
  ) {
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
    return await paginate<BookmarkEntity>(
      this.repository,
      { page, limit: perPage },
      {
        where: {
          user: {
            id: userId,
          },
          series: Not(IsNull()),
        },
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async findByUserIdAndPostIdAndSeriesId(
    userId: number,
    postId: number,
    seriesId: number,
  ) {
    let option = {};
    if (postId) {
      option = { post: { id: postId } };
    }
    if (seriesId) {
      option = { series: { id: seriesId } };
    }
    return await this.repository.findOne({
      where: {
        user: { id: userId },
        ...option,
      },
    });
  }

  async remove(entity: BookmarkEntity) {
    await this.repository.remove(entity);
  }
}
