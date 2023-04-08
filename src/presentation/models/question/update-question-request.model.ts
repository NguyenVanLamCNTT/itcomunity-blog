import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionRequestModel {
  @ApiProperty()
  content: string;
  @ApiProperty()
  keywords: string[];
  @ApiProperty()
  title: string;
}
