import {
  UpdateViewPostInputModel,
  UpdateViewPostResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import {
  PostRepository,
  SeriesPostRepository,
  SeriesRepository,
} from 'src/infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable({})
export class UpdateViewPostCommand
  implements BaseCommand<UpdateViewPostInputModel, UpdateViewPostResultModel>
{
  constructor(
    private postRepository: PostRepository,
    private seriesRepository: SeriesRepository,
    private seriesPostRepository: SeriesPostRepository,
  ) {}

  async execute(
    input: UpdateViewPostInputModel,
  ): Promise<UpdateViewPostResultModel> {
    const post = await this.postRepository.findById(input.postId);
    const seriesPost = await this.seriesPostRepository.findByPostId(
      input.postId,
    );
    post.viewNumber = post.viewNumber + 1;
    await this.postRepository.save(post);
    for (const item of seriesPost) {
      const series = item.series;
      series.viewNumber++;
      await this.seriesRepository.save(series);
    }

    return new UpdateViewPostResultModel({ success: true });
  }
}
