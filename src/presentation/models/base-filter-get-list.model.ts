import { ApiProperty } from '@nestjs/swagger';

export class BaseFilterGetListModel {
  @ApiProperty({ required: true, default: 1 })
  page: number;
  @ApiProperty({ required: true, default: 20 })
  perPage: number;
  @ApiProperty({
    required: false,
    description: 'fieldName,direction: name,asc||desc',
  })
  sort: string;
}
