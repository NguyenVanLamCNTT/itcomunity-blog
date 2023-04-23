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
    if (sort) {
      const filed = sort.split(',')[0];
      const direction = sort.split(',')[1] === 'asc' ? 'ASC' : 'DESC';
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
          relations: ['childComment'],
          order: { [filed]: direction },
        },
      );
    }

    const query = this.topicRepository.createQueryBuilder('topic');

    return await paginate<TopicEntity>(query, { page, limit: perPage });
  }

  async findById(id: number) {
    return await this.topicRepository.findOne({ where: { id } });
  }

  async save(entity: TopicEntity) {
    return await this.topicRepository.save(entity);
  }
}
