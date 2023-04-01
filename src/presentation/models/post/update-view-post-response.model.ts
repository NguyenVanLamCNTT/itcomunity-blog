import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

export class UpdateViewPostResponseData {
  @ApiProperty()
  success: boolean;
}

export class UpdateViewPostResponseModel extends ResponseModel<UpdateViewPostResponseData> {
  @ApiProperty({ type: UpdateViewPostResponseData })
  data: UpdateViewPostResponseData;

  constructor(partial: Partial<UpdateViewPostResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
