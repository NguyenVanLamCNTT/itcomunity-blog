import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

export class CreateAnswerResponseData {
  @ApiProperty()
  success: boolean;
}

export class CreateAnswerResponseModel extends ResponseModel<CreateAnswerResponseData> {
  @ApiProperty()
  data: CreateAnswerResponseData;

  constructor(partial: Partial<CreateAnswerResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
