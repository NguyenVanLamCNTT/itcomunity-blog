import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordRequestModel {
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  oldPassword: string;
}
