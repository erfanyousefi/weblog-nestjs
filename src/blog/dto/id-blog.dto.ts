import {IsUUID, IsNotEmpty} from "class-validator"
export class BlogIdDTO{
    @IsUUID(4)
    @IsNotEmpty()
    id : string
}