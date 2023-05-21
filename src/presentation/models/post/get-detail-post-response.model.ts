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

export class PostDetail {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  keywords: string[];
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
  @ApiProperty()
  isBookmark?: boolean;
  @ApiProperty()
  topicIds: number[];
}
export class GetDetailPostResponseModel extends ResponseModel<PostDetail> {
  @ApiProperty()
  data: PostDetail;
  constructor(partial: Partial<GetDetailPostResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
