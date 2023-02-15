import { Injectable } from '@nestjs/common';
import { CommonConstants } from 'src/domain/constants';
import { Gender } from 'src/domain/enums';
import {
  EmailExistException,
  GenderNotExistException,
} from 'src/domain/exceptions';
import {
  RegisterUserCommandInputModel,
  RegisterUserCommandResultModel,
} from 'src/domain/models';
import { UserEntity } from 'src/infrastructure/database/entities';
import { UserRepository } from 'src/infrastructure/database/repositories';
import { BaseCommand } from '../base-command';

@Injectable({})
export class RegisterUserCommand
  implements
    BaseCommand<RegisterUserCommandInputModel, RegisterUserCommandResultModel>
{
  constructor(private userRepository: UserRepository) {}
  async execute(
    input: RegisterUserCommandInputModel,
  ): Promise<RegisterUserCommandResultModel> {
    if (this.isGenderInvalid(input.gender)) {
      throw new GenderNotExistException();
    }

    const user = await this.userRepository.findByEmail(input.email);

    if (user) {
      throw new EmailExistException();
    }
    let avatar = '';
    if (input.gender !== Gender.FEMALE) {
      avatar =
        CommonConstants.ARRAY_IMAGE_AVATAR_MALE[
          Math.floor(
            Math.random() * CommonConstants.ARRAY_IMAGE_AVATAR_MALE.length,
          )
        ];
    } else {
      avatar =
        CommonConstants.ARRAY_IMAGE_AVATAR_FEMALE[
          Math.floor(
            Math.random() * CommonConstants.ARRAY_IMAGE_AVATAR_FEMALE.length,
          )
        ];
    }
    console.log(avatar);

    const entity = new UserEntity({
      ...input,
      avatar,
    });
    await this.userRepository.save(entity);

    return new RegisterUserCommandResultModel({ success: true });
  }

  private isGenderInvalid(gender: string): boolean {
    const value = Gender[gender];

    return !value;
  }
}
