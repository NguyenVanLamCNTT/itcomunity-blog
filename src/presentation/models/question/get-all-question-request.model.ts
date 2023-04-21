import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterGetListModel } from '../base-filter-get-list.model';

export class GetAllQuestionRequestModel extends BaseFilterGetListModel {
  @ApiProperty({ required: false })
  username?: string;
  @ApiProperty({ required: false })
  search?: string;
}
