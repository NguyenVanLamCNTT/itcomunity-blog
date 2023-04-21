import { ApiProperty } from '@nestjs/swagger';

export class refreshTokenRequestModel {
  @ApiProperty()
  refreshToken: string;
}
