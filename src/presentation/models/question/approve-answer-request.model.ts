import { ApiProperty } from '@nestjs/swagger';

export class ApprovedAnswerRequestModel {
  @ApiProperty()
  approved: boolean;
}
