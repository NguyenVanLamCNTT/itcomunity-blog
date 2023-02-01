import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Response {
  @ApiProperty()
  success: boolean;
}
export class ValidateOTPResponseModel extends ResponseModel<Response> {
  @ApiProperty()
  data: Response;
  constructor(partial: Partial<ValidateOTPResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
