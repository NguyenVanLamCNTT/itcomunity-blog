import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterGetListModel } from '../base-filter-get-list.model';

export class GetAllTopicRequestModel extends BaseFilterGetListModel {
  @ApiProperty({ required: false })
  search?: string;
}
