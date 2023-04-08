import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class UpdateAnswerResponseData {
  @ApiProperty()
  success: boolean;
}

export class UpdateAnswerResponseModel extends ResponseModel<UpdateAnswerResponseData> {
  @ApiProperty({ type: UpdateAnswerResponseData })
  data: UpdateAnswerResponseData;

  constructor(partial: Partial<UpdateAnswerResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
