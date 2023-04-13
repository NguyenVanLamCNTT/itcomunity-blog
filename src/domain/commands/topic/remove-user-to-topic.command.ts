import { Injectable } from '@nestjs/common';
import { BaseCommand } from '../base-command';
import {
  AddUserToTopicInputModel,
  AddUserToTopicResultModel,
} from 'src/domain/models';
import {
  TopicRepository,
  TopicUserRepository,
} from 'src/infrastructure/database/repositories';

@Injectable({})
export class RemoveUserToTopicCommand
  implements BaseCommand<AddUserToTopicInputModel, AddUserToTopicResultModel>
{
  constructor(
    private topicRepository: TopicRepository,
    private topicUserRepository: TopicUserRepository,
  ) {}
  async execute(
    input: AddUserToTopicInputModel,
  ): Promise<AddUserToTopicResultModel> {
    const topicUser = await this.topicUserRepository.findByUserIdAndTopicId(
      input.userId,
      input.topicId,
    );
    await this.topicUserRepository.remove(topicUser);
    return new AddUserToTopicResultModel({ success: true });
  }
}
