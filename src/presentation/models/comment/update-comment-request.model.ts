import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentRequestModel {
  @ApiProperty()
  content: string;
}
