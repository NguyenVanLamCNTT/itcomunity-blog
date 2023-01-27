import { ApiProperty } from "@nestjs/swagger";
import { ResponseErrorItem } from "./response-error-item.model";

export class ResponseError {
    @ApiProperty()
    code: number;
    @ApiProperty()
    message: string;
    @ApiProperty({
        type: ResponseErrorItem,
        isArray: true
    })
    errors: [ResponseErrorItem];

    constructor(partial: Partial<ResponseError>) {
        Object.assign(this, partial);
    }
}