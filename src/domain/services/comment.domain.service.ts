import { Injectable } from '@nestjs/common';
import {
  AddCommentCommand,
  RemoveCommentCommand,
  UpdateCommentCommand,
} from '../commands';
import { AddCommentInputModel } from '../models';
import { CommentQuery } from '../queries';

@Injectable()
export class CommentDomainService {
  constructor(
    private addCommentCommand: AddCommentCommand,
    private commentQuery: CommentQuery,
    private removeCommentCommand: RemoveCommentCommand,
    private updateCommentCommand: UpdateCommentCommand,
  ) {}

  async create(model: AddCommentInputModel) {
    return await this.addCommentCommand.execute(model);
  }

  async getAll(
    page: number,
    perPage: number,
    postId: number,
    seriesId: number,
    answerId: number,
  ) {
    return await this.commentQuery.findAll(
      page,
      perPage,
      postId,
      seriesId,
      answerId,
    );
  }

  async remove(id: number) {
    return await this.removeCommentCommand.execute({ id });
  }

  async update(id: number, content: string) {
    return await this.updateCommentCommand.execute({
      id,
      content,
    });
  }
}
