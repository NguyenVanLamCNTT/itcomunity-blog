import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Response {
  @ApiProperty()
  fileName: string;
}
export class UploadDMSResponseModel extends ResponseModel<Response> {
  @ApiProperty({ type: Response })
  data: Response;
  constructor(partial: Partial<UploadDMSResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
