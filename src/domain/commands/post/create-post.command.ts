import { Injectable } from '@nestjs/common';
import { UserNotExistException } from 'src/domain/exceptions';
import { CreatePostInputModel, CreatePostResultModel } from 'src/domain/models';
import { PostEntity } from 'src/infrastructure/database/entities';
import {
  PostRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class CreatePostCommand
  implements BaseCommand<CreatePostInputModel, CreatePostResultModel>
{
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}
  async execute(input: CreatePostInputModel): Promise<CreatePostResultModel> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new UserNotExistException();
    }
    const post = new PostEntity({
      keywords: input.keywords,
      content: input.content,
      author: user,
      imageThumbnail: input.imageUrl,
      name: input.name,
    });
    await this.postRepository.save(post);

    return new CreatePostResultModel({ success: true });
  }
}
