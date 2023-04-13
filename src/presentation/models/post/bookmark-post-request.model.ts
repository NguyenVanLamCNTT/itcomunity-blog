import { ApiProperty } from '@nestjs/swagger';

export class BookmarkPostRequestModel {
  @ApiProperty()
  postId: number;
  @ApiProperty()
  bookmark: boolean;
}
