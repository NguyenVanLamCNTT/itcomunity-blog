import { BaseCommand } from '../base-command';
import {
  UpdatePostFromSeriesInputModel,
  UpdateSeriesResultModel,
} from 'src/domain/models';
import { Injectable } from '@nestjs/common';
import {
  PostRepository,
  SeriesPostRepository,
  SeriesRepository,
} from 'src/infrastructure/database/repositories';
import { SeriesPostEntity } from 'src/infrastructure/database/entities';

@Injectable({})
export class UpdatePostFromSeriesCommand
  implements
    BaseCommand<UpdatePostFromSeriesInputModel, UpdateSeriesResultModel>
{
  constructor(
    private seriesRepository: SeriesRepository,
    private postSeriesRepository: SeriesPostRepository,
    private postRepository: PostRepository,
  ) {}
  async execute(
    input: UpdatePostFromSeriesInputModel,
  ): Promise<UpdateSeriesResultModel> {
    const series = await this.seriesRepository.findById(input.seriesId);
    for (const postId of input.postIdsAdd) {
      const post = await this.postRepository.findById(postId);
      await this.postSeriesRepository.save(
        new SeriesPostEntity({ post: post, series }),
      );
    }

    for (const postId of input.postIdsRemove) {
      const entity = await this.postSeriesRepository.findByPostIdAndSeriesId(
        input.seriesId,
        postId,
      );
      await this.postSeriesRepository.remove(entity);
    }

    return new UpdateSeriesResultModel({ success: true });
  }
}
