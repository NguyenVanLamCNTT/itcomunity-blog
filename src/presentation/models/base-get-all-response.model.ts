import { ApiProperty } from '@nestjs/swagger';

export class BaseGetAllResponseModel {
  @ApiProperty()
  page: number;
  @ApiProperty()
  perPage: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  totalItems: number;
}
