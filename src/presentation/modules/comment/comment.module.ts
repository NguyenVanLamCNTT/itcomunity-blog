import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddCommentCommand } from 'src/domain/commands';
import { CommentDomainService } from 'src/domain/services';
import {
  CommentEntity,
  PostEntity,
  SeriesEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import {
  CommentRepository,
  PostRepository,
  SeriesRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CommentEntity,
      PostEntity,
      SeriesEntity,
    ]),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentDomainService,
    AddCommentCommand,
    UserRepository,
    PostRepository,
    SeriesRepository,
    CommentRepository,
  ],
  exports: [TypeOrmModule],
})
export class CommentModule {}
