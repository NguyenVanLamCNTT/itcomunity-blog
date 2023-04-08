import { ApiProperty } from '@nestjs/swagger';
import { BaseGetAllResponseModel } from '../base-get-all-response.model';
import { ResponseModel } from '../response.model';

export class GetQuestionAuthor {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  avatar: string;
}
export class QuestionResponseModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  keywords: string[];
  @ApiProperty()
  content: string;
  @ApiProperty()
  viewNumber: number;
  @ApiProperty()
  bookMarkNumber: number;
  @ApiProperty()
  commentNumber: number;
  @ApiProperty()
  answerNumber: number;
  @ApiProperty()
  isTrending: boolean;
  @ApiProperty()
  author: GetQuestionAuthor;

  constructor(partial: Partial<QuestionResponseModel>) {
    Object.assign(this, partial);
  }
}

export class GetAllQuestionResponseData extends BaseGetAllResponseModel {
  @ApiProperty({ type: QuestionResponseModel, isArray: true })
  items: QuestionResponseModel[];
  constructor(partial: Partial<GetAllQuestionResponseData>) {
    super();
    Object.assign(this, partial);
  }
}

export class GetAllQuestionResponseModel extends ResponseModel<GetAllQuestionResponseData> {
  @ApiProperty({ type: GetAllQuestionResponseData })
  data: GetAllQuestionResponseData;

  constructor(partial: Partial<GetAllQuestionResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
