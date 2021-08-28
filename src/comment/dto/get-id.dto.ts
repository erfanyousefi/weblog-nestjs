import { IsUUID } from "class-validator";

export class GetIdDTO {
    @IsUUID('4')
    id : string
}