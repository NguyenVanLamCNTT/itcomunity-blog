import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
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
  @ApiProperty()
  seriesNumber?: number;
  @ApiProperty()
  questionNumber?: number;
  @ApiProperty()
  totalTopicFollow?: number;
  @ApiProperty({ type: Number, isArray: true })
  followerIds?: number[];
  @ApiProperty({ type: Number, isArray: true })
  followTopicIds?: number[];
  @ApiProperty({ type: Number, isArray: true })
  authorFollow?: number[];
}

export class GetInfoUserResponseModel extends ResponseModel<InfoData> {
  @ApiProperty({ type: InfoData })
  data: InfoData;
  constructor(partial: Partial<GetInfoUserResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
