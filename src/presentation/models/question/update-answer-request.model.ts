import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerRequestModel {
  @ApiProperty()
  content: string;
}
