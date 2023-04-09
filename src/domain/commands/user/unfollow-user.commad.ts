import { FollowUserInputModel, FollowUserResultModel } from 'src/domain/models';
import { BaseCommand } from '../base-command';
import { Injectable } from '@nestjs/common';
import {
  AuthorFollowerRepository,
  UserRepository,
} from 'src/infrastructure/database/repositories';

@Injectable({})
export class UnfollowUserCommand
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
    const author = await this.userRepository.findById(input.authorId);
    author.followersNumber = author.followersNumber - 1;
    await this.userRepository.save(author);
    await this.authorFollowerRepository.remove(check);

    return new FollowUserResultModel({ success: true });
  }
}
