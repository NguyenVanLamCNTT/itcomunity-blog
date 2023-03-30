import { Injectable } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { PostEntity } from 'src/infrastructure/database/entities';
import { GetAllPostRequestModel } from 'src/presentation/models';
import { CreatePostCommand, RemovePostCommand } from '../commands';
import { CreatePostInputModel, RemovePostInputModel } from '../models';
import { PostQuery } from '../queries';

@Injectable()
export class PostDomainService {
  constructor(
    private createPostCommand: CreatePostCommand,
    private removePostCommand: RemovePostCommand,
    private postQuery: PostQuery,
  ) {}

  async createPost(input: CreatePostInputModel): Promise<boolean> {
    const result = await this.createPostCommand.execute(input);
    return result.success;
  }

  async removePost(input: RemovePostInputModel): Promise<boolean> {
    const result = await this.removePostCommand.execute(input);
    return result.success;
  }

  async findAll(
    pageable: GetAllPostRequestModel,
  ): Promise<Pagination<PostEntity>> {
    return await this.postQuery.findAll(
      pageable.page,
      pageable.perPage,
      pageable.sort,
    );
  }

  async findById(id: number): Promise<PostEntity> {
    return await this.postQuery.findById(id);
  }

  async findByUserFollowTopic(
    pageable: GetAllPostRequestModel,
    userId: number,
  ) {
    return await this.postQuery.findAllByTopics(
      pageable.page,
      pageable.perPage,
      pageable.sort,
      userId,
    );
  }

  async findBySeries(
    seriesId: number,
    page: number,
    perPage: number,
    sort: string,
  ) {
    return await this.postQuery.findAllBySeries(seriesId, page, perPage, sort);
  }

  async findByAuthor(
    userId: number,
    page: number,
    perPage: number,
    sort: string,
  ) {
    return this.postQuery.findByAuthor(userId, page, perPage, sort);
  }
}
