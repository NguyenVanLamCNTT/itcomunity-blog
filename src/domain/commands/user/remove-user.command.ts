import {
  RemoveUserInputModel,
  UpdateInfoUserResultModel,
} from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/database/repositories';

@Injectable({})
export class RemoveUserCommand
  implements BaseCommand<RemoveUserInputModel, UpdateInfoUserResultModel>
{
  constructor(private userRepository: UserRepository) {}
  async execute(
    input: RemoveUserInputModel,
  ): Promise<UpdateInfoUserResultModel> {
    const user = await this.userRepository.findById(input.id);
    user.isDeleted = true;
    await this.userRepository.save(user);
    return { success: true };
  }
}
