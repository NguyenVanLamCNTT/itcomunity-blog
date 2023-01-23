import { ApiProperty } from "@nestjs/swagger";
import { ResponseModel } from "../response.model";

class Response {
    @ApiProperty()
    success: Boolean;
}

export class RegisterUserResponseModel extends ResponseModel<Response>{
    
    @ApiProperty({
        type: Response
    })
    data: Response;

    constructor(partial: Partial<RegisterUserResponseModel>) {
        super();
        Object.assign(this, partial);
    }
}