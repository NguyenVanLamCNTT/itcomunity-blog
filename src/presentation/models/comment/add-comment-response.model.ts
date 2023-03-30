import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class AddCommentResponseData {
  @ApiProperty()
  success: boolean;
}

export class AddCommentResponseModel extends ResponseModel<AddCommentResponseData> {
  @ApiProperty({ type: AddCommentResponseData })
  data: AddCommentResponseData;

  constructor(partial: Partial<AddCommentResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
