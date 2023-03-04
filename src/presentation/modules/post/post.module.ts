import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePostCommand, RemovePostCommand } from 'src/domain/commands';
import { PostQuery } from 'src/domain/queries';
import { PostDomainService } from 'src/domain/services';
import {
  PostEntity,
  TopicEntity,
  TopicPostEntity,
  TopicUserEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import {
  PostRepository,
  TopicPostRepository,
  TopicRepository,
  TopicUserRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
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
    ]),
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
  ],
  exports: [TypeOrmModule],
})
export class PostModule {}
