import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddNewSeriesCommand,
  CreatePostCommand,
  RemovePostCommand,
} from 'src/domain/commands';
import { PostQuery } from 'src/domain/queries';
import { SeriesQuery } from 'src/domain/queries/series.query';
import { PostDomainService } from 'src/domain/services';
import { SeriesDomainService } from 'src/domain/services/series.domain.service';
import {
  PostEntity,
  SeriesEntity,
  SeriesPostEntity,
  TopicEntity,
  TopicPostEntity,
  TopicUserEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import {
  PostRepository,
  SeriesPostRepository,
  SeriesRepository,
  TopicPostRepository,
  TopicRepository,
  TopicUserRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PostEntity,
      TopicEntity,
      TopicPostEntity,
      TopicUserEntity,
      SeriesEntity,
      SeriesPostEntity,
    ]),
  ],
  controllers: [SeriesController],
  providers: [
    UserRepository,
    PostRepository,
    PostDomainService,
    CreatePostCommand,
    RemovePostCommand,
    PostQuery,
    TopicRepository,
    TopicPostRepository,
    TopicUserRepository,
    SeriesService,
    SeriesRepository,
    SeriesQuery,
    SeriesDomainService,
    AddNewSeriesCommand,
    SeriesPostRepository,
  ],
  exports: [TypeOrmModule],
})
export class SeriesModule {}
