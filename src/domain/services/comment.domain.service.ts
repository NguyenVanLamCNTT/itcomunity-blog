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

  async getAll(
    page: number,
    perPage: number,
    postId: number,
    seriesId: number,
  ) {
    return await this.commentQuery.findAll(page, perPage, postId, seriesId);
  }
}
