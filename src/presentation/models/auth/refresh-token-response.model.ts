import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

export class RefreshTokenResponseData {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
export class RefreshTokenResponseModel extends ResponseModel<RefreshTokenResponseData> {
  @ApiProperty()
  data: RefreshTokenResponseData;

  constructor(partial: Partial<RefreshTokenResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
