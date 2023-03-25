import { Injectable } from '@nestjs/common';
import { PostNotExistException } from 'src/domain/exceptions/post-not-exist.exception';
import { RemovePostInputModel, RemovePostResult } from 'src/domain/models';
import {
  PostRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class RemovePostCommand
  implements BaseCommand<RemovePostInputModel, RemovePostResult>
{
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}
  async execute(input: RemovePostInputModel): Promise<RemovePostResult> {
    const post = await this.postRepository.findById(input.postId);
    const user = post.author;
    user.postsNumber = user.postsNumber - 1;

    if (!post) {
      throw new PostNotExistException();
    }

    post.isDeleted = true;

    await this.postRepository.save(post);
    await this.userRepository.save(user);

    return new RemovePostResult({ success: true });
  }
}
