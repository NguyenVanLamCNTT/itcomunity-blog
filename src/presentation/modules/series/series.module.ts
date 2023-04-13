import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddNewSeriesCommand,
  CreatePostCommand,
  RemovePostCommand,
  UpdateBookmarkCommand,
  UpdatePostCommand,
  UpdatePostFromSeriesCommand,
  UpdateSeriesCommand,
  UpdateViewPostCommand,
} from 'src/domain/commands';
import { BookMarkQuery, PostQuery } from 'src/domain/queries';
import { SeriesQuery } from 'src/domain/queries/series.query';
import { BookmarkDomainService, PostDomainService } from 'src/domain/services';
import { SeriesDomainService } from 'src/domain/services/series.domain.service';
import {
  AuthorFollowersEntity,
  BookmarkEntity,
  PostEntity,
  SeriesEntity,
  SeriesPostEntity,
  TopicEntity,
  TopicPostEntity,
  TopicUserEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import {
  AuthorFollowerRepository,
  BookmarkRepository,
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
      AuthorFollowersEntity,
      BookmarkEntity,
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
    UpdateViewPostCommand,
    UpdateSeriesCommand,
    UpdatePostFromSeriesCommand,
    UpdatePostCommand,
    AuthorFollowerRepository,
    BookmarkRepository,
    UpdateBookmarkCommand,
    BookMarkQuery,
    BookmarkDomainService,
  ],
  exports: [TypeOrmModule],
})
export class SeriesModule {}
