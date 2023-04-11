import { ApiProperty } from '@nestjs/swagger';
import { BaseGetAllResponseModel } from '../base-get-all-response.model';
import { ResponseModel } from '../response.model';

export class UserResponseModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  followersNumber: number;
  @ApiProperty()
  postsNumber: number;
  @ApiProperty()
  likesNumber: number;
  @ApiProperty()
  seriesNumber: number;
  @ApiProperty()
  questionsNumber: number;

  constructor(partial: Partial<UserResponseModel>) {
    Object.assign(this, partial);
  }
}

export class GetAllUserResponseData extends BaseGetAllResponseModel {
  @ApiProperty({ type: UserResponseModel, isArray: true })
  items: UserResponseModel[];
  constructor(partial: Partial<GetAllUserResponseData>) {
    super();
    Object.assign(this, partial);
  }
}

export class GetAllUserResponseModel extends ResponseModel<GetAllUserResponseData> {
  @ApiProperty()
  data: GetAllUserResponseData;
  constructor(partial: Partial<GetAllUserResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
