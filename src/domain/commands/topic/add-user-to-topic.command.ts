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
    if (!topic) {
      throw new TopicNotExistException();
    }
    const entity = new TopicUserEntity({
      topic,
      user,
    });

    await this.topicUserRepository.save(entity);

    return new AddUserToTopicResultModel({
      success: true,
    });
  }
}
