import {
  ChangePasswordCommandInputModel,
  ChangePasswordCommandResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable({})
export class ChangePasswordCommand
  implements
    BaseCommand<
      ChangePasswordCommandInputModel,
      ChangePasswordCommandResultModel
    >
{
  constructor(private userRepository: UserRepository) {}
  async execute(
    input: ChangePasswordCommandInputModel,
  ): Promise<ChangePasswordCommandResultModel> {
    const user = await this.userRepository.findById(input.userId);
    user.password = input.newPassword;
    await this.userRepository.save(user);

    return { success: true };
  }
}
