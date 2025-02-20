import { Injectable } from '@nestjs/common';
import {
  AuthorFollowerRepository,
  PostRepository,
  SeriesPostRepository,
  TopicPostRepository,
  TopicUserRepository,
} from 'src/infrastructure/database/repositories';

@Injectable()
export class PostQuery {
  constructor(
    private postRepository: PostRepository,
    private topicUserRepository: TopicUserRepository,
    private topicPostRepository: TopicPostRepository,
    private seriesPostRepository: SeriesPostRepository,
    private authorFollowerRepository: AuthorFollowerRepository,
  ) {}

  async findAll(
    page: number,
    perPage: number,
    sort: string,
    username: string,
    topicId: number,
    search?: string,
    status?: string,
    isDeleted?: boolean,
  ) {
    return await this.postRepository.findAll(
      page,
      perPage,
      sort,
      username,
      topicId,
      search,
      status,
      isDeleted,
    );
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

    const authorIds = (
      await this.authorFollowerRepository.findByFollowerId(userId)
    ).map((item) => item.author.id);

    return await this.postRepository.findAllByTopicIds(
      page,
      perPage,
      sort,
      topicIds,
      authorIds,
    );
  }

  async findAllBySeries(
    seriesId: number,
    page: number,
    perPage: number,
    sort: string,
  ) {
    const postIds = (
      await this.seriesPostRepository.findBySeriesId(seriesId)
    ).map((item) => item.post.id);

    return await this.postRepository.findInIds(postIds, page, perPage, sort);
  }

  async findByAuthor(
    userId: number,
    page: number,
    perPage: number,
    sort: string,
  ) {
    return this.postRepository.findByAuthor(userId, page, perPage, sort);
  }

  async getPostTrending() {
    return await this.postRepository.findTop10PostTrending();
  }

  async getTopicsByPost(postId: number) {
    return await this.topicPostRepository.findByPostIds(postId);
  }
}
