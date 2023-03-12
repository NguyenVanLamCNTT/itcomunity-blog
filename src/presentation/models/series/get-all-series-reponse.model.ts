import { ApiProperty } from '@nestjs/swagger';
import { BaseGetAllResponseModel } from '../base-get-all-response.model';
import { ResponseModel } from '../response.model';

class Author {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  avatar: string;
}

export class SeriesResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  viewNumber: number;
  @ApiProperty()
  bookMarkNumber: number;
  @ApiProperty()
  commentNumber: number;
  @ApiProperty()
  isTrending: boolean;
  @ApiProperty({ type: Author })
  author: Author;
  constructor(partial: Partial<SeriesResponse>) {
    Object.assign(this, partial);
  }
}

class Data extends BaseGetAllResponseModel {
  @ApiProperty({ type: SeriesResponse, isArray: true })
  items: SeriesResponse[];
}

export class GetAllSeriesResponseModel extends ResponseModel<Data> {
  @ApiProperty()
  data: Data;

  constructor(partial: Partial<GetAllSeriesResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
