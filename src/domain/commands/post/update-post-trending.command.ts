import { CreatePostResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { PostRepository } from 'src/infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable({})
export class UpdatePostTrendingCommand
  implements BaseCommand<any, CreatePostResultModel>
{
  constructor(private postRepository: PostRepository) {}
  async execute(input: any): Promise<CreatePostResultModel> {
    await this.postRepository.unTrending();
    const posts = await this.postRepository.findTop10PostTrending();
    for (const post of posts) {
      post.isTrending = true;
      await this.postRepository.save(post);
    }

    return new CreatePostResultModel({ success: true });
  }
}
