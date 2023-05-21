import {
  RemoveTopicInputModel,
  RemoveTopicResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { TopicRepository } from 'src/infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable({})
export class RemoveTopicCommand
  implements BaseCommand<RemoveTopicInputModel, RemoveTopicResultModel>
{
  constructor(private topicRepository: TopicRepository) {}

  async execute(input: RemoveTopicInputModel): Promise<RemoveTopicResultModel> {
    const topic = await this.topicRepository.findById(input.id);
    topic.isDeleted = true;
    await this.topicRepository.save(topic);

    return { success: true };
  }
}
