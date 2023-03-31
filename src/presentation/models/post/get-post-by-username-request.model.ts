import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterGetListModel } from '../base-filter-get-list.model';

export class GetPostByUsernameRequestModel extends BaseFilterGetListModel {
  @ApiProperty()
  username: string;
}
