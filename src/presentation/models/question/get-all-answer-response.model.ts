import { ApiProperty } from '@nestjs/swagger';
import { BaseGetAllResponseModel } from '../base-get-all-response.model';
import { ResponseModel } from '../response.model';

class GetAnswerAuthor {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  avatar: string;
}

export class AnswerResponseModel {
  id: number;
  content: string;
  isApproved: boolean;
  author: GetAnswerAuthor;

  constructor(partial: Partial<AnswerResponseModel>) {
    Object.assign(this, partial);
  }
}

export class GetAllAnswerResponseData extends BaseGetAllResponseModel {
  @ApiProperty({ type: AnswerResponseModel, isArray: true })
  items: AnswerResponseModel[];
  constructor(partial: Partial<GetAllAnswerResponseData>) {
    super();
    Object.assign(this, partial);
  }
}

export class GetAllAnswerResponseModel extends ResponseModel<GetAllAnswerResponseData> {
  @ApiProperty({ type: GetAllAnswerResponseData })
  data: GetAllAnswerResponseData;

  constructor(partial: Partial<GetAllAnswerResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
