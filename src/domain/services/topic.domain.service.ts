import { Injectable } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TopicEntity } from 'src/infrastructure/database/entities';
import {
  AddUserToTopicCommand,
  CreateTopicCommand,
  RemoveUserToTopicCommand,
} from '../commands';
import { AddUserToTopicInputModel, CreateTopicInputModel } from '../models';
import { TopicQuery } from '../queries';

@Injectable()
export class TopicDomainService {
  constructor(
    private topicQuery: TopicQuery,
    private addUserToTopicCommand: AddUserToTopicCommand,
    private createTopicCommand: CreateTopicCommand,
    private removeUserToTopicCommand: RemoveUserToTopicCommand,
  ) {}

  async findAll(
    page: number,
    perPage: number,
    sort: string,
    search?: string,
  ): Promise<Pagination<TopicEntity>> {
    return await this.topicQuery.findAll(page, perPage, sort, search);
  }

  async addUserToTopic(input: AddUserToTopicInputModel) {
    return await this.addUserToTopicCommand.execute(input);
  }

  async create(model: CreateTopicInputModel) {
    return await this.createTopicCommand.execute(model);
  }

  async removeUserToTopic(model: AddUserToTopicInputModel) {
    return await this.removeUserToTopicCommand.execute(model);
  }
}
