import { ApiProperty } from "@nestjs/swagger";
import { ResponseError } from "./response-error.model";

export class ResponseModel<TData> {
    @ApiProperty()
    id: string;
    @ApiProperty()
    data: TData;
    @ApiProperty()
    errors?: ResponseError
}