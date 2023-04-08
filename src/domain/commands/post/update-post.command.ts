import { UpdatePostInputModel, UpdatePostResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/infrastructure/database/repositories';

@Injectable({})
export class UpdatePostCommand
  implements BaseCommand<UpdatePostInputModel, UpdatePostResultModel>
{
  constructor(private postRepository: PostRepository) {}
  async execute(input: UpdatePostInputModel): Promise<UpdatePostResultModel> {
    const post = await this.postRepository.findById(input.postId);
    post.name = input.title;
    post.keywords = input.keywords;
    post.status = input.status;
    post.content = input.content;
    await this.postRepository.save(post);

    return new UpdatePostResultModel({ success: true });
  }
}
