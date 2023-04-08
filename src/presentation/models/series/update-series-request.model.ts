import { ApiProperty } from '@nestjs/swagger';

export class UpdateSeriesRequestModel {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: String, isArray: true })
  keywords: string[];
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: string;
}
