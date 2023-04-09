import { Injectable } from '@nestjs/common';
import {
  FollowUserCommand,
  RegisterUserCommand,
  UnfollowUserCommand,
  UpdateConfirmEmailUserCommand,
  UpdateInfoUserCommand,
} from '../commands';
import {
  RegisterUserCommandInputModel,
  UpdateConfirmEmailUserInputModel,
  UpdateInfoUserInputModel,
} from '../models';
import { UserQuery } from '../queries';

@Injectable()
export class UserDomainService {
  constructor(
    private userQuery: UserQuery,
    private registerUserCommand: RegisterUserCommand,
    private updateConfirmEmailUserCommand: UpdateConfirmEmailUserCommand,
    private updateInfoUserCommand: UpdateInfoUserCommand,
    private followUserCommand: FollowUserCommand,
    private unfollowUserCommand: UnfollowUserCommand,
  ) {}

  async getAllUser() {
    return await this.userQuery.getAll();
  }

  async createUser(
    registerUserCommandInputModel: RegisterUserCommandInputModel,
  ): Promise<boolean> {
    const result = await this.registerUserCommand.execute(
      registerUserCommandInputModel,
    );
    return result.success;
  }

  async getUserByEmailOrUsername(textSearch: string) {
    const user = await this.userQuery.getUserByEmailOrUsername(textSearch);
    return user;
  }

  async confirmEmailUser(email: string) {
    const result = await this.updateConfirmEmailUserCommand.execute(
      new UpdateConfirmEmailUserInputModel({ email }),
    );
    return result.success;
  }

  async getById(id: number) {
    return await this.userQuery.getById(id);
  }

  async update(model: UpdateInfoUserInputModel) {
    return await this.updateInfoUserCommand.execute(model);
  }

  async followUser(authorId: number, userId: number) {
    return await this.followUserCommand.execute({
      authorId,
      userId,
    });
  }

  async unfollowUser(authorId: number, userId: number) {
    return await this.unfollowUserCommand.execute({
      authorId,
      userId,
    });
  }

  async getFollowerByAuthor(authorId: number) {
    return await this.userQuery.getFollower(authorId);
  }
}
