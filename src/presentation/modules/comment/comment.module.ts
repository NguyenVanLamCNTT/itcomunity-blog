import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddCommentCommand,
  RemoveAnswerCommand,
  RemoveCommentCommand,
  UpdateCommentCommand,
} from 'src/domain/commands';
import { CommentDomainService } from 'src/domain/services';
import {
  AnswerEntity,
  CommentEntity,
  PostEntity,
  SeriesEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import {
  AnswerRepository,
  CommentRepository,
  PostRepository,
  SeriesRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentQuery } from 'src/domain/queries';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CommentEntity,
      PostEntity,
      SeriesEntity,
      AnswerEntity,
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
    CommentQuery,
    AnswerRepository,
    RemoveCommentCommand,
    UpdateCommentCommand,
  ],
  exports: [TypeOrmModule],
})
export class CommentModule {}
