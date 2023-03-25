import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class UpdateInfoUserResponseData {
  @ApiProperty()
  success: boolean;
}

export class UpdateInfoUserResponseModel extends ResponseModel<UpdateInfoUserResponseData> {
  @ApiProperty({ type: UpdateInfoUserResponseData })
  data: UpdateInfoUserResponseData;

  constructor(partial: Partial<UpdateInfoUserResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
