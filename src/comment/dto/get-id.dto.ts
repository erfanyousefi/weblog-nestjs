import { IsNotEmpty, IsUUID } from "class-validator";
export class GetIdDTO {
    @IsUUID('4')
    @IsNotEmpty()
    id : string
}