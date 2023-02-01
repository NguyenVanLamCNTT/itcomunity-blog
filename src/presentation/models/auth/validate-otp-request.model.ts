import { ApiProperty } from '@nestjs/swagger';

export class ValidateOTPRequestModel {
  @ApiProperty()
  email: string;
  @ApiProperty()
  otp: number;
}
