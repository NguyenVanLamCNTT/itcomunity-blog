import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class UpdateQuestionResponseData {
  @ApiProperty()
  success: boolean;
}
export class UpdateQuestionResponseModel extends ResponseModel<UpdateQuestionResponseData> {
  @ApiProperty({ type: UpdateQuestionResponseData })
  data: UpdateQuestionResponseData;

  constructor(partial: Partial<UpdateQuestionResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
