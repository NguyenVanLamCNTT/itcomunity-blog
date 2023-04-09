import { ApiProperty } from '@nestjs/swagger';

export class FollowUserRequestModel {
  @ApiProperty()
  authorId: number;
  @ApiProperty()
  follow: boolean;
}
