import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { In, Repository } from 'typeorm';
import { TopicEntity, TopicPostEntity } from '../entities';

export class TopicPostRepository {
  constructor(
    @InjectRepository(TopicPostEntity)
    private topicPostRepository: Repository<TopicPostEntity>,
  ) {}

  async save(entity: TopicPostEntity) {
    await this.topicPostRepository.save(entity);
  }

  async findByTopicIds(topicIds: number[]) {
    return await this.topicPostRepository.find({
      relations: ['topic', 'post'],
      where: { topic: { id: In(topicIds) } },
    });
  }
}
