import { Injectable } from '@nestjs/common';
import {
  AuthorFollowerRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';

@Injectable()
export class UserQuery {
  constructor(
    private userRepository: UserRepository,
    private authorFollowerRepository: AuthorFollowerRepository,
  ) {}

  async getAll() {
    return await this.userRepository.findAll();
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
}
