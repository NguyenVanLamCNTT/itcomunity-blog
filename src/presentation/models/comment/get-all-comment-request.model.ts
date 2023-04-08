import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterGetListModel } from '../base-filter-get-list.model';

export class GetAllCommentRequestModel extends BaseFilterGetListModel {
  @ApiProperty({ required: false })
  postId?: number;
  @ApiProperty({ required: false })
  seriesId?: number;
  @ApiProperty({ required: false })
  answerId?: number;
}
