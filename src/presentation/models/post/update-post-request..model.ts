import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostRequestModel {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: String, isArray: true })
  keywords: string[];
  @ApiProperty()
  content: string;
  @ApiProperty()
  status: string;
}
