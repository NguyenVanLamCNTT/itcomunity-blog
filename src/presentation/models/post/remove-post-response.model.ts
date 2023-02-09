import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Response {
  @ApiProperty()
  success: boolean;
}

export class RemovePostResponseModel extends ResponseModel<Response> {
  @ApiProperty()
  data: Response;
  constructor(partial: Partial<RemovePostResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
