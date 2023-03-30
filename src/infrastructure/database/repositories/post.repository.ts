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

  async findAll(page: number, perPage: number, sort: string) {
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
        where: { isDeleted: false },
        relations: ['author'],
        order: { [sortBy]: sortDir.toLocaleUpperCase() },
      },
    );
  }

  async findAllByTopicIds(
    page: number,
    perPage: number,
    sort: string,
    postIds: number[],
  ) {
    if (sort) {
      const filed = sort.split(',')[0];
      const direction = sort.split(',')[1] === 'asc' ? 'ASC' : 'DESC';
      const query = this.postRepository
        .createQueryBuilder('posts')
        .where('posts.isDeleted = :status', { status: false })
        .where('posts.id In (:postIds)', { postIds })
        .innerJoin('posts.author', 'user')
        .addSelect('user.id')
        .addSelect('user.fullName')
        .addSelect('user.username')
        .orderBy(`posts.${filed}`, direction);

      return await paginate<PostEntity>(query, { page, limit: perPage });
    }

    const query = this.postRepository
      .createQueryBuilder('posts')
      .where('posts.isDeleted = :status', { status: false })
      // .where('posts.id IN (:postIds)', {postIds})
      .innerJoin('posts.author', 'user')
      .addSelect('user.id')
      .addSelect('user.fullName')
      .addSelect('user.username')
      .orderBy(`posts.created`, 'DESC');

    return await paginate<PostEntity>(query, { page, limit: perPage });
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
