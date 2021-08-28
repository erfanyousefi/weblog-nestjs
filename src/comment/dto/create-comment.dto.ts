import { IsNotEmpty, ValidateIf } from "class-validator";

export class CreateCommentDTO {
    @IsNotEmpty()
    text : string
}