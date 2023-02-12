import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Response {
  @ApiProperty()
  success: boolean;
}

export class CreatePostResponseModel extends ResponseModel<Response> {
  data: Response;
  constructor(partial: Partial<CreatePostResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
