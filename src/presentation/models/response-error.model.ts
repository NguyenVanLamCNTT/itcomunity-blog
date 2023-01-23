import { ApiProperty } from "@nestjs/swagger";
import { ResponseErrorItem } from "./response-error-item.model";

export class ResponseError {
    @ApiProperty()
    code: string;
    @ApiProperty()
    message: string;
    @ApiProperty({
        type: ResponseErrorItem,
        isArray: true
    })
    errors: [ResponseErrorItem]
}