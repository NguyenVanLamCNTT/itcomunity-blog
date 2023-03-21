import { Injectable } from '@nestjs/common';
import { UserDomainService } from 'src/domain/services';
import { GetInfoUserResponseModel } from 'src/presentation/models';
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
}
