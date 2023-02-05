import { Injectable } from '@nestjs/common/decorators';
import { UserNotExistException } from 'src/domain/exceptions';
import {
  UpdateConfirmEmailUserInputModel,
  UpdateConfirmEmailUserResultModel,
} from 'src/domain/models';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class UpdateConfirmEmailUserCommand
  implements
    BaseCommand<
      UpdateConfirmEmailUserInputModel,
      UpdateConfirmEmailUserResultModel
    >
{
  constructor(private userRepository: UserRepository) {}
  async execute(
    input: UpdateConfirmEmailUserInputModel,
  ): Promise<UpdateConfirmEmailUserResultModel> {
    console.log(input.email);

    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new UserNotExistException();
    }
    user.isConfirmEmail = true;
    this.userRepository.save(user);
    return new UpdateConfirmEmailUserResultModel({ success: true });
  }
}
