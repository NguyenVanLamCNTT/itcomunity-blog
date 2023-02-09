import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePostCommand, RemovePostCommand } from 'src/domain/commands';
import { PostDomainService } from 'src/domain/services';
import { PostEntity, UserEntity } from 'src/infrastructure/database/entities';
import {
  PostRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity])],
  controllers: [PostController],
  providers: [
    UserRepository,
    PostRepository,
    PostService,
    PostDomainService,
    CreatePostCommand,
    RemovePostCommand,
  ],
  exports: [TypeOrmModule],
})
export class PostModule {}
