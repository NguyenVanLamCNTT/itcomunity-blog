import { ApiProperty } from '@nestjs/swagger';

export class CreateSeriesRequestModel {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: Number, isArray: true })
  postIds: number[];
  @ApiProperty()
  status: string;
  @ApiProperty({ type: String, isArray: true })
  keywords: string[];
}
