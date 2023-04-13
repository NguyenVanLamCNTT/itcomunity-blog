import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddUserToTopicCommand,
  CreateTopicCommand,
  RemoveUserToTopicCommand,
} from 'src/domain/commands';
import { TopicQuery } from 'src/domain/queries';
import { TopicDomainService } from 'src/domain/services';
import {
  TopicEntity,
  TopicUserEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import {
  TopicRepository,
  TopicUserRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicEntity, TopicUserEntity, UserEntity]),
  ],
  controllers: [TopicController],
  providers: [
    TopicRepository,
    TopicQuery,
    TopicDomainService,
    TopicService,
    AddUserToTopicCommand,
    TopicUserRepository,
    UserRepository,
    CreateTopicCommand,
    RemoveUserToTopicCommand,
  ],
  exports: [],
})
export class TopicModule {}
