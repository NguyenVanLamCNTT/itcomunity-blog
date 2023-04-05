import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class CreateQuestionResponseData {
  @ApiProperty()
  success: boolean;
}

export class CreateQuestionResponseModel extends ResponseModel<CreateQuestionResponseData> {
  @ApiProperty({ type: CreateQuestionResponseData })
  data: CreateQuestionResponseData;

  constructor(partial: Partial<CreateQuestionResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
