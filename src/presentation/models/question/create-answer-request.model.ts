import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerRequestModel {
  @ApiProperty()
  content: string;
  @ApiProperty()
  questionId: number;
}
