import { Injectable } from '@nestjs/common';
import { UserNotExistException } from 'src/domain/exceptions';
import {
  UpdateInfoUserInputModel,
  UpdateInfoUserResultModel,
} from 'src/domain/models';
import { UserEntity } from 'src/infrastructure/database/entities';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class UpdateInfoUserCommand
  implements BaseCommand<UpdateInfoUserInputModel, UpdateInfoUserResultModel>
{
  constructor(private userRepository: UserRepository) {}

  async execute(
    input: UpdateInfoUserInputModel,
  ): Promise<UpdateInfoUserResultModel> {
    const user = await this.userRepository.findById(input.id);
    if (!user) {
      throw new UserNotExistException();
    }
    const entity = new UserEntity({ ...input, fullName: input.fullname });
    await this.userRepository.save(entity);
    return new UpdateInfoUserResultModel({ success: true });
  }
}
