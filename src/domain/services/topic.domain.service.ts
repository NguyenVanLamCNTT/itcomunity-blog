import { Injectable } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TopicEntity } from 'src/infrastructure/database/entities';
import { AddUserToTopicCommand } from '../commands';
import { AddUserToTopicInputModel } from '../models';
import { TopicQuery } from '../queries';

@Injectable()
export class TopicDomainService {
  constructor(
    private topicQuery: TopicQuery,
    private addUserToTopicCommand: AddUserToTopicCommand,
  ) {}

  async findAll(
    page: number,
    perPage: number,
    sort: string,
  ): Promise<Pagination<TopicEntity>> {
    return await this.topicQuery.findAll(page, perPage, sort);
  }

  async addUserToTopic(input: AddUserToTopicInputModel) {
    return await this.addUserToTopicCommand.execute(input);
  }
}
