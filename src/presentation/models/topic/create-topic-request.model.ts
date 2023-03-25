import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicRequestModel {
  @ApiProperty()
  name: string;
  @ApiProperty()
  image: string;
}
