import { Injectable } from '@nestjs/common';
import {
  CreateTopicInputModel,
  CreateTopicResultModel,
} from 'src/domain/models';
import { TopicEntity } from 'src/infrastructure/database/entities';
import { TopicRepository } from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class CreateTopicCommand
  implements BaseCommand<CreateTopicInputModel, CreateTopicResultModel>
{
  constructor(private topicRepository: TopicRepository) {}

  async execute(input: CreateTopicInputModel): Promise<CreateTopicResultModel> {
    const entity = new TopicEntity({ name: input.name, image: input.image });
    await this.topicRepository.save(entity);

    return new CreateTopicResultModel({ success: true });
  }
}
