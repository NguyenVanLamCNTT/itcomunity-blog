import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from '../response.model';

class Response {
  @ApiProperty()
  success: boolean;
}

export class CreateSeriesResponseModel extends ResponseModel<Response> {
  data: Response;
  constructor(partial: Partial<CreateSeriesResponseModel>) {
    super();
    Object.assign(this, partial);
  }
}
