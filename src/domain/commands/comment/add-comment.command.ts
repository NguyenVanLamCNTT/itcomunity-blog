import { Injectable } from '@nestjs/common';
import { AddCommentInputModel, AddCommentResultModel } from 'src/domain/models';
import { CommentEntity } from 'src/infrastructure/database/entities';
import {
  CommentRepository,
  PostRepository,
  SeriesRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class AddCommentCommand
  implements BaseCommand<AddCommentInputModel, AddCommentResultModel>
{
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository,
    private seriesRepository: SeriesRepository,
    private userRepository: UserRepository,
  ) {}
  async execute(input: AddCommentInputModel): Promise<AddCommentResultModel> {
    const comment = await this.commentRepository.findById(
      input.parentCommentId,
    );
    const post = await this.postRepository.findById(input.postId);
    const series = await this.seriesRepository.findById(input.seriesId);
    const user = await this.userRepository.findById(input.userId);
    const entity = new CommentEntity({
      author: user,
      content: input.content,
      post: post,
      parentComment: comment,
      series: series,
    });

    await this.commentRepository.save(entity);

    return new AddCommentResultModel({ success: true });
  }
}
