import { Injectable } from '@nestjs/common';
import {
  PostRepository,
  TopicPostRepository,
  TopicUserRepository,
} from 'src/infrastructure/database/repositories';

@Injectable()
export class PostQuery {
  constructor(
    private postRepository: PostRepository,
    private topicUserRepository: TopicUserRepository,
    private topicPostRepository: TopicPostRepository,
  ) {}

  async findAll(page: number, perPage: number, sort: string) {
    return await this.postRepository.findAll(page, perPage, sort);
  }

  async findById(id: number) {
    return await this.postRepository.findById(id);
  }

  async findAllByTopics(
    page: number,
    perPage: number,
    sort: string,
    userId: number,
  ) {
    const topicIds = (await this.topicUserRepository.findByUserId(userId)).map(
      (item) => item.topic.id,
    );

    const postIds = (
      await this.topicPostRepository.findByTopicIds(topicIds)
    ).map((item) => item.post.id);
    return await this.postRepository.findAllByTopicIds(
      page,
      perPage,
      sort,
      postIds,
    );
  }
}
