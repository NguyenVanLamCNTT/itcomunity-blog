import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { TopicUserEntity } from '../entities';

export class TopicUserRepository {
  constructor(
    @InjectRepository(TopicUserEntity)
    private topicUserRepository: Repository<TopicUserEntity>,
  ) {}

  async save(entity: TopicUserEntity) {
    await this.topicUserRepository.save(entity);
  }

  async findByUserId(userId: number) {
    return await this.topicUserRepository.find({
      relations: ['user', 'topic'],
      where: { user: { id: userId } },
    });
  }
}
