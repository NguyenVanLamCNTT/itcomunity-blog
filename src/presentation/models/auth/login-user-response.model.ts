import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Response {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  isConfirmEmail: boolean;
  @ApiProperty()
  isAdmin: boolean;
  @ApiProperty()
  lastLogin: Date;
}
export class LoginUserResponseModel extends ResponseModel<Response> {
  @ApiProperty({
    type: Response,
  })
  data: Response;

  constructor(partial: Partial<LoginUserResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
