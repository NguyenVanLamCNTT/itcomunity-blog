import { ApiProperty } from '@nestjs/swagger';
import { BaseGetAllResponseModel } from '../base-get-all-response.model';
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
}
export class PostResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  keyworks: string[];
  @ApiProperty()
  content: string;
  @ApiProperty()
  viewNumber: number;
  @ApiProperty()
  bookMarkNumber: number;
  @ApiProperty()
  commentNumber: number;
  @ApiProperty()
  imageThumbnail: string;
  @ApiProperty()
  isTrending: boolean;
  @ApiProperty({ type: Author })
  author: Author;

  constructor(partial: Partial<PostResponse>) {
    Object.assign(this, partial);
  }
}
class Data extends BaseGetAllResponseModel {
  @ApiProperty({ type: PostResponse, isArray: true })
  items: PostResponse[];
}

export class GetAllPostResponseModel extends ResponseModel<Data> {
  @ApiProperty({ type: Data })
  data: Data;

  constructor(partial: Partial<GetAllPostResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
