import { Injectable } from '@nestjs/common';
import { UpdateInfoUserInputModel } from 'src/domain/models';
import { UserDomainService } from 'src/domain/services';
import { GetInfoUserResponseModel } from 'src/presentation/models';
import { FollowUserRequestModel } from 'src/presentation/models/users/follow-user-request.model';
import { FollowUserResponseModel } from 'src/presentation/models/users/follow-user-response.model';
import { UpdateInfoUserRequestModel } from 'src/presentation/models/users/update-info-user-request.model';
import { UpdateInfoUserResponseModel } from 'src/presentation/models/users/update-info-user-response.model';
import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class UserService {
  constructor(private userDomainService: UserDomainService) {}

  async getAllUser() {
    return await this.userDomainService.getAllUser();
  }

  async getInfo(id: number) {
    const user = await this.userDomainService.getById(id);
    return new GetInfoUserResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        id: user.id,
        about: user.about,
        age: user.age,
        avatar: user.avatar,
        email: user.email,
        followersNumber: user.followersNumber,
        fullName: user.fullName,
        gender: user.gender,
        likesNumber: user.likesNumber,
        postsNumber: user.postsNumber,
        username: user.username,
      },
    });
  }

  async updateInfoUser(request: UpdateInfoUserRequestModel, userId: number) {
    const result = await this.userDomainService.update(
      new UpdateInfoUserInputModel({
        id: userId,
        ...request,
      }),
    );

    return new UpdateInfoUserResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: result.success },
    });
  }

  async getUser(username: string) {
    const user = await this.userDomainService.getUserByEmailOrUsername(
      username,
    );

    const followerIds = (
      await this.userDomainService.getFollowerByAuthor(user.id)
    ).map((item) => item.id);

    return new GetInfoUserResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        id: user.id,
        about: user.about,
        age: user.age,
        avatar: user.avatar,
        email: user.email,
        followersNumber: user.followersNumber,
        fullName: user.fullName,
        gender: user.gender,
        likesNumber: user.likesNumber,
        postsNumber: user.postsNumber,
        username: user.username,
        followerIds,
      },
    });
  }

  async folowUser(req: FollowUserRequestModel, userId: number) {
    if (req.follow) {
      await this.userDomainService.followUser(req.authorId, userId);
    } else {
      await this.userDomainService.unfollowUser(req.authorId, userId);
    }

    return new FollowUserResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: true },
    });
  }
}
