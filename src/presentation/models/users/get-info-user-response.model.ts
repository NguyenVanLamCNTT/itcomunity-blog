import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class InfoData {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  followersNumber: number;
  @ApiProperty()
  postsNumber: number;
  @ApiProperty()
  likesNumber: number;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  about: string;
}

export class GetInfoUserResponseModel extends ResponseModel<InfoData> {
  @ApiProperty()
  data: InfoData;
  constructor(partial: Partial<GetInfoUserResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
