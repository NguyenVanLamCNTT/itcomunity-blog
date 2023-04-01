import { ApiProperty } from '@nestjs/swagger';

export class UpdateViewPostRequestModel {
  @ApiProperty()
  postId: number;
}
