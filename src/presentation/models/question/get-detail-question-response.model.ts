import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';
import { QuestionResponseModel } from './get-all-question-response.model';

export class GetDetailQuestionResponseModel extends ResponseModel<QuestionResponseModel> {
  @ApiProperty({ type: QuestionResponseModel })
  data: QuestionResponseModel;

  constructor(partial: Partial<GetDetailQuestionResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
