import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class CreatePostWithChatGPTData {
  @ApiProperty()
  text: string;
}

export class CreatePostWithChatGPTResponseModel extends ResponseModel<CreatePostWithChatGPTData> {
  @ApiProperty()
  data: CreatePostWithChatGPTData;
  constructor(partial: Partial<CreatePostWithChatGPTResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
