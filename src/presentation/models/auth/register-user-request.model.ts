import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/domain/enums';

export class RegisterUserRequestModel {
  @ApiProperty()
  username: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  gender: Gender;
}
