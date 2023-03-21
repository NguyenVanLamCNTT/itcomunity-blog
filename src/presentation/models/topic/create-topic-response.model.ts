import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class DataResponse {
  @ApiProperty()
  success: boolean;
}
export class CreateTopicResponseModel extends ResponseModel<DataResponse> {
  @ApiProperty()
  data: DataResponse;

  constructor(partial: Partial<CreateTopicResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
