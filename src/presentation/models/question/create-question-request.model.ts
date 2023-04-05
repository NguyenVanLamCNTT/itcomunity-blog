import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionRequestModel {
  @ApiProperty()
  content: string;
  @ApiProperty()
  keywords: string[];
}
