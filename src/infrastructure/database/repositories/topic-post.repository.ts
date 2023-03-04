import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { TopicEntity, TopicPostEntity } from '../entities';

export class TopicPostRepository {
  constructor(
    @InjectRepository(TopicPostEntity)
    private topicPostRepository: Repository<TopicPostEntity>,
  ) {}

  async save(entity: TopicPostEntity) {
    await this.topicPostRepository.save(entity);
  }
}
