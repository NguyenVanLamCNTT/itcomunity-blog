import { Injectable } from '@nestjs/common';
import {
  TopicNotExistException,
  UserNotExistException,
} from 'src/domain/exceptions';
import { CreatePostInputModel, CreatePostResultModel } from 'src/domain/models';
import {
  PostEntity,
  TopicPostEntity,
} from 'src/infrastructure/database/entities';
import {
  PostRepository,
  TopicPostRepository,
  TopicRepository,
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
    private topicRepository: TopicRepository,
    private topicPostRepository: TopicPostRepository,
  ) {}
  async execute(input: CreatePostInputModel): Promise<CreatePostResultModel> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new UserNotExistException();
    }
    const entity = new PostEntity({
      keywords: input.keywords,
      content: input.content,
      author: user,
      imageThumbnail: input.imageUrl,
      name: input.name,
      status: input.status,
    });
    const post = await this.postRepository.save(entity);
    await this.addPostToTopic(input.topics, post);
    user.postsNumber = user.postsNumber + 1;
    await this.userRepository.save(user);

    return new CreatePostResultModel({ success: true });
  }

  private async addPostToTopic(topicIds: number[], post: PostEntity) {
    for (const id of topicIds) {
      const topic = await this.topicRepository.findById(id);
      if (!topic) {
        throw new TopicNotExistException();
      }
      const entity = new TopicPostEntity({
        post,
        topic,
      });
      this.topicPostRepository.save(entity);
    }
  }
}
