import { Injectable } from '@nestjs/common';
import { AddCommentCommand } from '../commands';
import { AddCommentInputModel } from '../models';
import { CommentQuery } from '../queries';

@Injectable()
export class CommentDomainService {
  constructor(
    private addCommentCommand: AddCommentCommand,
    private commentQuery: CommentQuery,
  ) {}

  async create(model: AddCommentInputModel) {
    return await this.addCommentCommand.execute(model);
  }

  async getByPostId(postId: number, page: number, perPage: number) {
    return await this.commentQuery.findByPostId(postId, page, perPage);
  }

  async getBySeriesId(seriesId: number, page: number, perPage: number) {
    return await this.commentQuery.findBySeriesId(seriesId, page, perPage);
  }
}
