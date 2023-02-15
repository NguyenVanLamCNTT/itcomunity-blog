import { ApiProperty } from '@nestjs/swagger';

export class ConfirmOTPRequestModel {
  @ApiProperty()
  username: string;
}
