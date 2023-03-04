import { ApiProperty } from '@nestjs/swagger';

export class AddTopicToUserRequestModel {
  @ApiProperty()
  topicId: number;
}
