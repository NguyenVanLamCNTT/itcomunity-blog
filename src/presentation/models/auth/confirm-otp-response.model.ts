import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Response {
  @ApiProperty()
  success: boolean;
}

export class ConfirmOTPResponseModel extends ResponseModel<Response> {
  @ApiProperty({
    type: Response,
  })
  data: Response;

  constructor(partial: Partial<ConfirmOTPResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
