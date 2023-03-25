import { ApiProperty } from '@nestjs/swagger';

export class UpdateInfoUserRequestModel {
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  about: string;
}
