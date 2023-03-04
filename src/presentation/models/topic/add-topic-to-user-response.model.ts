import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Data {
  @ApiProperty()
  success: boolean;
}
export class AddTopicToUserResponseMode extends ResponseModel<Data> {
  @ApiProperty({ type: Data })
  data: Data;
  constructor(partial: Partial<AddTopicToUserResponseMode>) {
    super();
    Object.assign(this, partial);
  }
}
