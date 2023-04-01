import { ApiProperty } from '@nestjs/swagger';

export class GetUserRequestModel {
  @ApiProperty()
  username: string;
}
