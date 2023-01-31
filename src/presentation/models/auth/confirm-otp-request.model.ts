import { ApiProperty } from '@nestjs/swagger';

export class ConfirmOTPRequestModel {
  @ApiProperty()
  email: string;
  @ApiProperty()
  fullname: string;
}
