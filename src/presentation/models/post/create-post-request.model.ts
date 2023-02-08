import { ApiProperty } from '@nestjs/swagger';

export class CreatePostRequestModel {
  @ApiProperty({ type: String, isArray: true })
  keywords: string[];
  @ApiProperty()
  content: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  name: string;
}
