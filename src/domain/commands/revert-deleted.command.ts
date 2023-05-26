import {
  PostRepository,
  QuestionRepository,
  SeriesRepository,
  TopicRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import {
  RevertDeletedCommandInputModel,
  RevertDeletedCommandResultModel,
} from '../models';
import { BaseCommand } from './base-command';
import { Injectable } from '@nestjs/common';

@Injectable({})
export class RevertDeletedCommand
  implements
    BaseCommand<
      RevertDeletedCommandInputModel,
      RevertDeletedCommandResultModel
    >
{
  constructor(
    private userRepository: UserRepository,
    private topicRepository: TopicRepository,
    private questionRepository: QuestionRepository,
    private seriesRepository: SeriesRepository,
    private postRepository: PostRepository,
  ) {}
  async execute(
    input: RevertDeletedCommandInputModel,
  ): Promise<RevertDeletedCommandResultModel> {
    if (input.userId) {
      const user = await this.userRepository.findById(input.userId);
      user.isDeleted = false;
      await this.userRepository.save(user);
    }
    if (input.topicId) {
      const topic = await this.topicRepository.findById(input.topicId);
      topic.isDeleted = false;
      await this.topicRepository.save(topic);
    }
    if (input.postId) {
      const post = await this.postRepository.findById(input.postId);
      post.isDeleted = false;
      await this.postRepository.save(post);
    }
    if (input.questionId) {
      const question = await this.questionRepository.findById(input.questionId);
      question.isDeleted = false;
      await this.questionRepository.save(question);
    }
    if (input.seriesId) {
      const series = await this.seriesRepository.findById(input.seriesId);
      series.isDeleted = false;
      await this.seriesRepository.save(series);
    }

    return { success: true };
  }
}
