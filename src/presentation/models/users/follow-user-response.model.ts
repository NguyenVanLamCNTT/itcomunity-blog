import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

export class FollowUserResponseData {
  success: boolean;
}

export class FollowUserResponseModel extends ResponseModel<FollowUserResponseData> {
  @ApiProperty({ type: FollowUserResponseData })
  data: FollowUserResponseData;

  constructor(partial: Partial<FollowUserResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
