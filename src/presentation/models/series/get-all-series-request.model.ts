import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterGetListModel } from '../base-filter-get-list.model';

export class GetAllSeriesRequestModel extends BaseFilterGetListModel {
  @ApiProperty({ required: false })
  username: string;
}
