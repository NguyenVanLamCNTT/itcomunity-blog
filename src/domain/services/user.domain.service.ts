import { Injectable } from '@nestjs/common';
import {
  RegisterUserCommand,
  UpdateConfirmEmailUserCommand,
} from '../commands';
import {
  RegisterUserCommandInputModel,
  UpdateConfirmEmailUserInputModel,
} from '../models';
import { UserQuery } from '../queries';

@Injectable()
export class UserDomainService {
  constructor(
    private userQuery: UserQuery,
    private registerUserCommand: RegisterUserCommand,
    private updateConfirmEmailUserCommand: UpdateConfirmEmailUserCommand,
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
}
