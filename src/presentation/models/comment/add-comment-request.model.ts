import { ApiProperty } from '@nestjs/swagger';

export class AddCommentRequestModel {
  @ApiProperty()
  postId: number;
  @ApiProperty()
  seriesId: number;
  @ApiProperty()
  answerId: number;
  @ApiProperty()
  parentCommentId: number;
  @ApiProperty()
  content: string;
}
