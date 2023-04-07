import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AnswerEntity,
  QuestionEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import {
  CreateAnswerCommand,
  CreateQuestionCommand,
} from 'src/domain/commands';
import { QuestionDomainService } from 'src/domain/services/question.domain.service';
import {
  AnswerRepository,
  QuestionRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { AnswerQuery, QuestionQuery } from 'src/domain/queries';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, QuestionEntity, AnswerEntity]),
  ],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    CreateQuestionCommand,
    QuestionRepository,
    QuestionDomainService,
    UserRepository,
    QuestionQuery,
    AnswerRepository,
    CreateAnswerCommand,
    AnswerQuery,
  ],
  exports: [],
})
export class QuestionModule {}
