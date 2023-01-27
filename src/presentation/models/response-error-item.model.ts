import { ApiProperty } from "@nestjs/swagger";

export class ResponseErrorItem {
    @ApiProperty()
    reason: string;
    @ApiProperty()
    message: string;

    constructor(partial: Partial<ResponseErrorItem>) {
        Object.assign(this, partial);
    }
}