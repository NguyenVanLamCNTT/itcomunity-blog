import { ApiProperty } from '@nestjs/swagger';

export class RevertDeletedRequestModel {
  @ApiProperty({ required: false })
  postId?: number;
  @ApiProperty({ required: false })
  seriesId?: number;
  @ApiProperty({ required: false })
  questionId?: number;
  @ApiProperty({ required: false })
  topicId?: number;
  @ApiProperty({ required: false })
  userId?: number;
}
