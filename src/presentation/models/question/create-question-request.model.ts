import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionRequestModel {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  keywords: string[];
}
