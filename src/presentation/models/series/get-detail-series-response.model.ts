import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Author {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  followersNumber: number;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  likesNumber: number;
  @ApiProperty()
  postsNumber: number;
}

class ResponseData {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  viewNumber: number;
  @ApiProperty()
  bookMarkNumber: number;
  @ApiProperty()
  commentNumber: number;
  @ApiProperty()
  isTrending: boolean;
  @ApiProperty()
  status: string;
  @ApiProperty({ type: String, isArray: true })
  keywords: string[];
  @ApiProperty()
  author: Author;
}

export class GetDetailSeriesResponseModel extends ResponseModel<ResponseData> {
  @ApiProperty()
  data: ResponseData;
  constructor(partial: Partial<GetDetailSeriesResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
