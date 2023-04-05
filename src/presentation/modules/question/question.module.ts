import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AnswerEntity,
  QuestionEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { CreateQuestionCommand } from 'src/domain/commands';
import { QuestionDomainService } from 'src/domain/services/question.domain.service';
import {
  QuestionRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';

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
  ],
  exports: [],
})
export class QuestionModule {}
