import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterGetListModel } from '../base-filter-get-list.model';

export class GetAllPostRequestModel extends BaseFilterGetListModel {
  @ApiProperty({ required: false })
  username?: string;
  @ApiProperty({ required: false })
  topicId?: number;
  @ApiProperty({ required: false })
  search?: string;
}
