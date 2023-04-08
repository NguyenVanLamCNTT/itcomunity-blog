import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostFromSeriesRequestModel {
  @ApiProperty({ type: Number, isArray: true })
  postIdsAdd: number[];
  @ApiProperty({ type: Number, isArray: true })
  postIdsRemove: number[];
}
