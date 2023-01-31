import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequestModel {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  remember: boolean;
}
