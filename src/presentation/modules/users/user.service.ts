import { Injectable } from '@nestjs/common';
import { UpdateInfoUserInputModel } from 'src/domain/models';
import { UserDomainService } from 'src/domain/services';
import {
  GetAllAnswerResponseModel,
  GetAllUserRequestModel,
  GetAllUserResponseModel,
  GetInfoUserResponseModel,
  UserResponseModel,
} from 'src/presentation/models';
import { FollowUserRequestModel } from 'src/presentation/models/users/follow-user-request.model';
import { FollowUserResponseModel } from 'src/presentation/models/users/follow-user-response.model';
import { UpdateInfoUserRequestModel } from 'src/presentation/models/users/update-info-user-request.model';
import { UpdateInfoUserResponseModel } from 'src/presentation/models/users/update-info-user-response.model';
import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class UserService {
  constructor(private userDomainService: UserDomainService) {}

  async getAllUser(req: GetAllUserRequestModel) {
    const data = await this.userDomainService.getAllUser(
      req.page,
      req.perPage,
      req.sort,
      req.search,
      req.isDeleted,
    );

    return new GetAllUserResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: {
        page: data.meta.currentPage,
        perPage: data.meta.itemsPerPage,
        totalItems: data.meta.totalItems,
        totalPages: data.meta.totalPages,
        items: data.items.map((item) => {
          return new UserResponseModel({
            id: item.id,
            avatar: item.avatar,
            followersNumber: item.followersNumber,
            fullname: item.fullName,
            likesNumber: item.likesNumber,
            postsNumber: item.postsNumber,
            questionsNumber: item.questionsNumber,
            seriesNumber: item.seriesNumber,
            username: item.username,
          });
        }),
      },
    });
  }

  async getInfo(id: number) {
    const user = await this.userDomainService.getById(id);
    const topicUsers = await this.userDomainService.getTopicUserByUserId(id);
    const topicIds = topicUsers.map((item) => item.topic.id);
    const userfollows = await this.userDomainService.getAuthorByFollowerId(id);
    const authorIds = userfollows.map((i) => i.author.id);
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
        followTopicIds: topicIds,
        authorFollow: authorIds,
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
    ).map((item) => item.follower.id);

    const totalTopic = (
      await this.userDomainService.getTopicUserByUserId(user.id)
    ).length;

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
        seriesNumber: user.seriesNumber,
        questionNumber: user.questionsNumber,
        totalTopicFollow: totalTopic,
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

  async remove(id: number) {
    const data = await this.userDomainService.removeUser(id);
    return new FollowUserResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { success: true },
    });
  }

  async getAllSummary() {
    const data = await this.userDomainService.getAllSummary();
    return data.map((item) => {
      delete item.password;
      return item;
    });
  }
}
