import { FollowUserInputModel, FollowUserResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import {
  AuthorFollowerRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';
import {
  AuthorFollowersEntity,
  UserEntity,
} from 'src/infrastructure/database/entities';

@Injectable({})
export class FollowUserCommand
  implements BaseCommand<FollowUserInputModel, FollowUserResultModel>
{
  constructor(
    private authorFollowerRepository: AuthorFollowerRepository,
    private userRepository: UserRepository,
  ) {}
  async execute(input: FollowUserInputModel): Promise<FollowUserResultModel> {
    const check = await this.authorFollowerRepository.findByAuthorIdFollowerId(
      input.authorId,
      input.userId,
    );

    if (check) {
      return new FollowUserResultModel({ success: true });
    }

    const author = await this.userRepository.findById(input.authorId);
    author.followersNumber = author.followersNumber + 1;
    await this.userRepository.save(author);
    const follower = new UserEntity({ id: input.userId });

    const entity = new AuthorFollowersEntity({
      author,
      follower,
    });

    await this.authorFollowerRepository.save(entity);

    return new FollowUserResultModel({ success: true });
  }
}
