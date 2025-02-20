import { Injectable } from '@nestjs/common';
import { TopicNotExistException } from 'src/domain/exceptions';
import {
  AddUserToTopicInputModel,
  AddUserToTopicResultModel,
} from 'src/domain/models';
import { TopicUserEntity } from 'src/infrastructure/database/entities';
import {
  TopicRepository,
  TopicUserRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class AddUserToTopicCommand
  implements BaseCommand<AddUserToTopicInputModel, AddUserToTopicResultModel>
{
  constructor(
    private userRepository: UserRepository,
    private topicRepository: TopicRepository,
    private topicUserRepository: TopicUserRepository,
  ) {}

  async execute(
    input: AddUserToTopicInputModel,
  ): Promise<AddUserToTopicResultModel> {
    const user = await this.userRepository.findById(input.userId);
    const topic = await this.topicRepository.findById(input.topicId);
    const topicUser = await this.topicUserRepository.findByUserIdAndTopicId(
      input.userId,
      input.topicId,
    );
    if (topicUser) {
      return new AddUserToTopicResultModel({
        success: true,
      });
    }
    if (!topic) {
      throw new TopicNotExistException();
    }
    const entity = new TopicUserEntity({
      topic,
      user,
    });

    await this.topicUserRepository.save(entity);

    topic.followersNumber = topic.followersNumber + 1;
    await this.topicRepository.save(topic);

    return new AddUserToTopicResultModel({
      success: true,
    });
  }
}
