import { UpdatePostInputModel, UpdatePostResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import {
  PostRepository,
  TopicPostRepository,
  TopicRepository,
} from 'src/infrastructure/database/repositories';
import {
  PostEntity,
  TopicPostEntity,
} from 'src/infrastructure/database/entities';
import { TopicNotExistException } from 'src/domain/exceptions';

@Injectable({})
export class UpdatePostCommand
  implements BaseCommand<UpdatePostInputModel, UpdatePostResultModel>
{
  constructor(
    private postRepository: PostRepository,
    private topicRepository: TopicRepository,
    private topicPostRepository: TopicPostRepository,
  ) {}
  async execute(input: UpdatePostInputModel): Promise<UpdatePostResultModel> {
    const post = await this.postRepository.findById(input.postId);
    post.name = input.title;
    post.keywords = input.keywords;
    post.status = input.status;
    post.content = input.content;
    await this.postRepository.save(post);
    await this.updatePostToTopic(input.topics, post);

    return new UpdatePostResultModel({ success: true });
  }

  private async updatePostToTopic(topicIds: number[], post: PostEntity) {
    const postTopics = await this.topicPostRepository.findByPostIds(post.id);
    for (const item of postTopics) {
      await this.topicPostRepository.remove(item);
      const topic = item.topic;
      topic.postNumber = topic.postNumber - 1;
      await this.topicRepository.save(topic);
    }
    for (const id of topicIds) {
      const topic = await this.topicRepository.findById(id);
      if (!topic) {
        throw new TopicNotExistException();
      }
      topic.postNumber = topic.postNumber + 1;
      await this.topicRepository.save(topic);
      const entity = new TopicPostEntity({
        post,
        topic,
      });
      await this.topicPostRepository.save(entity);
    }
  }
}
