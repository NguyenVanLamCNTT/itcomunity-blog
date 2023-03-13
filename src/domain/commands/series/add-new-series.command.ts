import { Injectable } from '@nestjs/common';
import { UserNotExistException } from 'src/domain/exceptions';
import {
  AddNewSeriesInputModel,
  AddNewSeriesResultModel,
} from 'src/domain/models';
import {
  SeriesEntity,
  SeriesPostEntity,
} from 'src/infrastructure/database/entities';
import {
  PostRepository,
  SeriesPostRepository,
  SeriesRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class AddNewSeriesCommand
  implements BaseCommand<AddNewSeriesInputModel, AddNewSeriesResultModel>
{
  constructor(
    private seriesRepository: SeriesRepository,
    private userRepository: UserRepository,
    private postSeriesRepository: SeriesPostRepository,
    private postRepository: PostRepository,
  ) {}

  async execute(
    input: AddNewSeriesInputModel,
  ): Promise<AddNewSeriesResultModel> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new UserNotExistException();
    }
    const entity = new SeriesEntity({
      author: user,
      name: input.name,
      description: input.description,
      keywords: input.keywords,
      status: input.status,
    });
    const series = await this.seriesRepository.save(entity);
    for (const postId of input.postIds) {
      const post = await this.postRepository.findById(postId);
      await this.postSeriesRepository.save(
        new SeriesPostEntity({ post: post, series }),
      );
    }

    return new AddNewSeriesResultModel({ success: true });
  }
}
