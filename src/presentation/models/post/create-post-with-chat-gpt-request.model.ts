import { ApiProperty } from '@nestjs/swagger';

export class CreatePostWithChatGPTRequestModel {
  @ApiProperty()
  question: string;
}
