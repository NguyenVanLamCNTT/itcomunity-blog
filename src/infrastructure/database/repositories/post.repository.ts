import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { In, Repository } from 'typeorm';
import { PostEntity } from '../entities';

export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async save(post: PostEntity) {
    return await this.postRepository.save(post);
  }

  async findById(id: number) {
    return await this.postRepository.findOne({ where: { id } });
  }

  async findAll(
    page: number,
    perPage: number,
    sort: string,
    username?: string,
    topicId?: number,
  ) {
    let query = {};
    if (username) {
      query = {
        author: { username },
      };
    }
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';

    return await paginate<PostEntity>(
      this.postRepository,
      {
        page: page,
        limit: perPage,
      },
      {
        where: {
          isDeleted: false,
          ...query,
          status: 'PUBLISH',
          topicPost: { topic: { id: topicId } },
        },
        relations: ['author', 'topicPost'],
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async findAllByTopicIds(
    page: number,
    perPage: number,
    sort: string,
    topicIds: number[],
    authorIds: number[],
  ) {
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
    return await paginate<PostEntity>(
      this.postRepository,
      { page, limit: perPage },
      {
        where: [
          {
            isDeleted: false,
            topicPost: {
              topic: { id: In(topicIds) },
            },
            author: {
              id: In(authorIds),
            },
          },
          {
            isDeleted: false,
            topicPost: {
              topic: { id: In(topicIds) },
            },
          },
          {
            isDeleted: false,
            author: {
              id: In(authorIds),
            },
          },
        ],
        relations: ['author', 'topicPost'],
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async findInIds(
    postIds: number[],
    page: number,
    perPage: number,
    sort: string,
  ) {
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';

    return await paginate<PostEntity>(
      this.postRepository,
      {
        page: page,
        limit: perPage,
      },
      {
        where: { isDeleted: false, id: In(postIds) },
        relations: ['author'],
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async findByAuthor(
    userId: number,
    page: number,
    perPage: number,
    sort: string,
  ) {
    const sortBy = sort ? sort.split(',')[0] : 'created';
    const sortDir = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';

    return await paginate<PostEntity>(
      this.postRepository,
      {
        page: page,
        limit: perPage,
      },
      {
        where: { author: { id: userId }, isDeleted: false },
        relations: ['author'],
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }
}
