import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePostCommand, RemovePostCommand } from 'src/domain/commands';
import { PostQuery } from 'src/domain/queries';
import { PostDomainService } from 'src/domain/services';
import {
  PostEntity,
  TopicEntity,
  TopicPostEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import {
  PostRepository,
  TopicPostRepository,
  TopicRepository,
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
  ],
  exports: [TypeOrmModule],
})
export class PostModule {}
