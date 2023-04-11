import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FollowUserCommand,
  RegisterUserCommand,
  UnfollowUserCommand,
  UpdateConfirmEmailUserCommand,
  UpdateInfoUserCommand,
} from 'src/domain/commands';
import { UserQuery } from 'src/domain/queries';
import { UserDomainService } from 'src/domain/services';
import {
  AuthorFollowersEntity,
  TopicUserEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';
import {
  AuthorFollowerRepository,
  TopicUserRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AuthorFollowersEntity,
      TopicUserEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserQuery,
    UserDomainService,
    UserService,
    RegisterUserCommand,
    UpdateConfirmEmailUserCommand,
    UpdateInfoUserCommand,
    FollowUserCommand,
    UnfollowUserCommand,
    AuthorFollowerRepository,
    TopicUserRepository,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
