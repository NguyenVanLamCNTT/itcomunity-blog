import { Injectable } from '@nestjs/common';
import { BaseCommand } from '../base-command';
import {
  UpdateBookmarkInputModel,
  UpdateBookmarkResultModel,
} from 'src/domain/models';
import {
  BookmarkRepository,
  PostRepository,
  SeriesRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import {
  BookmarkEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';

@Injectable()
export class UpdateBookmarkCommand
  implements BaseCommand<UpdateBookmarkInputModel, UpdateBookmarkResultModel>
{
  constructor(
    private bookmarkRepository: BookmarkRepository,
    private userRepository: UserRepository,
    private postRepository: PostRepository,
    private seriesRepository: SeriesRepository,
  ) {}
  async execute(
    input: UpdateBookmarkInputModel,
  ): Promise<UpdateBookmarkResultModel> {
    console.log(input.seriesId);

    const user = await this.userRepository.findById(input.userId);
    const bookmark =
      await this.bookmarkRepository.findByUserIdAndPostIdAndSeriesId(
        input.userId,
        input.postId,
        input.seriesId,
      );
    if (input.bookmark) {
      if (!bookmark) {
        let entity = null;
        if (input.postId) {
          const post = await this.postRepository.findById(input.postId);
          post.bookMarkNumber = post.bookMarkNumber + 1;
          await this.postRepository.save(post);
          entity = new BookmarkEntity({
            user,
            post,
          });
        }
        if (input.seriesId) {
          const series = await this.seriesRepository.findById(input.seriesId);
          series.bookMarkNumber = series.bookMarkNumber + 1;
          await this.seriesRepository.save(series);
          entity = new BookmarkEntity({
            user,
            series,
          });
        }
        await this.bookmarkRepository.save(entity);
      }
    } else {
      this.bookmarkRepository.remove(bookmark);
      if (input.postId) {
        const post = await this.postRepository.findById(input.postId);
        post.bookMarkNumber = post.bookMarkNumber - 1;
        await this.postRepository.save(post);
      }
      if (input.seriesId) {
        const series = await this.seriesRepository.findById(input.seriesId);
        series.bookMarkNumber = series.bookMarkNumber - 1;
        await this.seriesRepository.save(series);
      }
    }

    return { success: true };
  }
}
