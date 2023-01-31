import { Injectable } from '@nestjs/common';
import { RegisterUserCommand } from '../commands';
import { RegisterUserCommandInputModel } from '../models';
import { UserQuery } from '../queries';

@Injectable()
export class UserDomainService {
  constructor(
    private userQuery: UserQuery,
    private registerUserCommand: RegisterUserCommand,
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
}
