import { ApiProperty } from '@nestjs/swagger';
import { BaseGetAllResponseModel } from '../base-get-all-response.model';
import { ResponseModel } from '../response.model';

class GetAllCommentAuthor {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullname: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  avatar: string;
}

export class GetAllCommentModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  reportNumber: number;
  @ApiProperty()
  author: GetAllCommentAuthor;
  @ApiProperty({ type: GetAllCommentModel, isArray: true })
  childComment?: GetAllCommentModel[];

  constructor(partial: Partial<GetAllCommentModel>) {
    Object.assign(this, partial);
  }
}

export class GetAllCommentResponseData extends BaseGetAllResponseModel {
  @ApiProperty({ type: GetAllCommentModel, isArray: true })
  items: GetAllCommentModel[];
  constructor(partial: Partial<GetAllCommentResponseData>) {
    super();
    Object.assign(this, partial);
  }
}

export class GetAllCommentResponseModel extends ResponseModel<GetAllCommentResponseData> {
  @ApiProperty({ type: GetAllCommentResponseData })
  data: GetAllCommentResponseData;

  constructor(partial: Partial<GetAllCommentResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
