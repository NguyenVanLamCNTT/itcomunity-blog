import { Injectable } from '@nestjs/common';
import { AddCommentInputModel, AddCommentResultModel } from 'src/domain/models';
import { CommentEntity } from 'src/infrastructure/database/entities';
import {
  AnswerRepository,
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
    private answerRepository: AnswerRepository,
  ) {}
  async execute(input: AddCommentInputModel): Promise<AddCommentResultModel> {
    try {
      let comment = null;
      let post = null;
      let series = null;
      let answer = null;
      if (input.parentCommentId) {
        comment = await this.commentRepository.findById(input.parentCommentId);
      }
      if (input.postId) {
        post = await this.postRepository.findById(input.postId);
        post.commentNumber = post.commentNumber + 1;
        await this.postRepository.save(post);
      }
      if (input.seriesId) {
        series = await this.seriesRepository.findById(input.seriesId);
        series.commentNumber = series.commentNumber + 1;
        await this.seriesRepository.save(series);
      }
      if (input.answerId) {
        answer = await this.answerRepository.findById(input.answerId);
      }
      const user = !input.userId
        ? null
        : await this.userRepository.findById(input.userId);
      const entity = new CommentEntity({
        author: user,
        content: input.content,
        post: post,
        parentComment: comment,
        series: series,
        reportNumber: 0,
      });

      await this.commentRepository.save(entity);

      return new AddCommentResultModel({ success: true });
    } catch (error) {
      console.log(error);
    }
  }
}
