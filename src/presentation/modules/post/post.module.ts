import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreatePostCommand,
  RemovePostCommand,
  UpdatePostCommand,
  UpdatePostFromSeriesCommand,
  UpdateSeriesCommand,
  UpdateViewPostCommand,
} from 'src/domain/commands';
import { PostQuery } from 'src/domain/queries';
import { PostDomainService } from 'src/domain/services';
import {
  AuthorFollowersEntity,
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
  PostRepository,
  SeriesPostRepository,
  SeriesRepository,
  TopicPostRepository,
  TopicRepository,
  TopicUserRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { GPTUtil } from 'src/infrastructure/utilities/gpt.util';
import configuration from 'src/presentation/configurations/configuration';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PostEntity,
      TopicEntity,
      TopicPostEntity,
      TopicUserEntity,
      SeriesPostEntity,
      SeriesEntity,
      AuthorFollowersEntity,
    ]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [PostController],
  providers: [
    UserRepository,
    PostRepository,
    PostService,
    PostDomainService,
    CreatePostCommand,
    RemovePostCommand,
    PostQuery,
    TopicRepository,
    TopicPostRepository,
    TopicUserRepository,
    SeriesPostRepository,
    GPTUtil,
    UpdateViewPostCommand,
    SeriesRepository,
    UpdatePostCommand,
    UpdateSeriesCommand,
    UpdatePostFromSeriesCommand,
    AuthorFollowerRepository,
  ],
  exports: [TypeOrmModule],
})
export class PostModule {}
