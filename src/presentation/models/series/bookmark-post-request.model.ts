import { ApiProperty } from '@nestjs/swagger';

export class BookmarkSeriesRequestModel {
  @ApiProperty()
  seriesId: number;
  @ApiProperty()
  bookmark: boolean;
}
