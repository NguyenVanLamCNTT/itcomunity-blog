import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { ILike, Like, Repository } from 'typeorm';
import { TopicEntity } from '../entities';

export class TopicRepository {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {}

  async findAll(page: number, perPage: number, sort: string, search?: string) {
    const filed = sort ? sort.split(',')[0] : 'created';
    const direction = sort
      ? sort.split(',')[1] === 'asc'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
    let option = {};
    if (search) {
      option = {
        ...option,
        name: ILike(`%${search}%`),
      };
    }
    return await paginate<TopicEntity>(
      this.topicRepository,
      { page, limit: perPage },
      {
        where: {
          ...option,
          isDeleted: false,
        },
        order: { [filed]: direction },
      },
    );
  }

  async findById(id: number) {
    return await this.topicRepository.findOne({ where: { id } });
  }

  async save(entity: TopicEntity) {
    return await this.topicRepository.save(entity);
  }
}
