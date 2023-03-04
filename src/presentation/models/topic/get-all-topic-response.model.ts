import { ApiProperty } from '@nestjs/swagger';
import { BaseGetAllResponseModel } from '../base-get-all-response.model';
import { ResponseModel } from '../response.model';

export class TopicResponseModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  followersNumber: number;

  @ApiProperty()
  answerNumber: number;

  @ApiProperty()
  postNumber: number;

  @ApiProperty()
  isTrending: boolean;

  constructor(partial: Partial<TopicResponseModel>) {
    Object.assign(this, partial);
  }
}

class DataTopic extends BaseGetAllResponseModel {
  @ApiProperty({ type: TopicResponseModel, isArray: true })
  items: TopicResponseModel[];
}

export class GetAllTopicResponseModel extends ResponseModel<DataTopic> {
  @ApiProperty({ type: DataTopic })
  data: DataTopic;

  constructor(partial: Partial<GetAllTopicResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
