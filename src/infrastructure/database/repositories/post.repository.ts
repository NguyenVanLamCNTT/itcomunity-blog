import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities';

export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async save(post: PostEntity) {
    await this.postRepository.save(post);
  }

  async findById(id: number) {
    return await this.postRepository.findOne({ where: { id } });
  }

  async findAll(page: number, perPage: number, sort: string) {
    if (sort) {
      const filed = sort.split(',')[0];
      const direction = sort.split(',')[1] === 'asc' ? 'ASC' : 'DESC';
      return await this.postRepository
        .createQueryBuilder('posts')

        .innerJoin('posts.author', 'user')
        .addSelect('user.id')
        .addSelect('user.fullName')
        .addSelect('user.username')
        .skip((page - 1) * perPage)
        .take(perPage)
        .orderBy(`posts.${filed}`, direction)
        .getMany();
    }

    return await this.postRepository
      .createQueryBuilder('posts')

      .innerJoin('posts.author', 'user')
      .addSelect('user.id')
      .addSelect('user.fullName')
      .addSelect('user.username')
      .skip((page - 1) * perPage)
      .take(perPage)
      .orderBy(`posts.created`, 'DESC')
      .getMany();
  }
}
