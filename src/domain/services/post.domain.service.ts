import { Injectable } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { PostEntity } from 'src/infrastructure/database/entities';
import { GetAllPostRequestModel } from 'src/presentation/models';
import {
  CreatePostCommand,
  RemovePostCommand,
  UpdatePostCommand,
  UpdatePostTrendingCommand,
  UpdateViewPostCommand,
} from '../commands';
import {
  CreatePostInputModel,
  RemovePostInputModel,
  UpdatePostInputModel,
  UpdateViewPostInputModel,
} from '../models';
import { PostQuery } from '../queries';

@Injectable()
export class PostDomainService {
  constructor(
    private createPostCommand: CreatePostCommand,
    private removePostCommand: RemovePostCommand,
    private updateViewCommand: UpdateViewPostCommand,
    private postQuery: PostQuery,
    private updatePostCommand: UpdatePostCommand,
    private updatePostTrendingCommand: UpdatePostTrendingCommand,
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
      pageable.username,
      pageable.topicId,
      pageable.search,
      pageable.status,
      pageable.isDeleted,
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

  async updateViewPost(postId: number) {
    const result = await this.updateViewCommand.execute(
      new UpdateViewPostInputModel({ postId }),
    );

    return result.success;
  }

  async updatePost(input: UpdatePostInputModel) {
    return await this.updatePostCommand.execute(input);
  }

  async updateTrending() {
    return await this.updatePostTrendingCommand.execute(null);
  }

  async getTrending() {
    return await this.postQuery.getPostTrending();
  }

  async getTopicByPost(postId: number) {
    return await this.postQuery.getTopicsByPost(postId);
  }
}
