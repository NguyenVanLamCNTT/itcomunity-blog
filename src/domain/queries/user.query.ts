import { Injectable } from '@nestjs/common';
import {
  AuthorFollowerRepository,
  TopicUserRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';

@Injectable()
export class UserQuery {
  constructor(
    private userRepository: UserRepository,
    private authorFollowerRepository: AuthorFollowerRepository,
    private topicUserRepository: TopicUserRepository,
  ) {}

  async getAll(page: number, perPage: number, sort: string, search?: string) {
    return await this.userRepository.findAll(page, perPage, sort, search);
  }

  async getUserByEmailOrUsername(textSearch: string) {
    return await this.userRepository.findByEmailOrUsername(textSearch);
  }

  async getById(id: number) {
    return await this.userRepository.findById(id);
  }

  async getFollower(authorId: number) {
    return this.authorFollowerRepository.findByAuthorId(authorId);
  }

  async getTopicUserByUserId(userId: number) {
    return await this.topicUserRepository.findByUserId(userId);
  }

  async getAuthorByFollowerId(userId: number) {
    return await this.authorFollowerRepository.findByFollowerId(userId);
  }
}
