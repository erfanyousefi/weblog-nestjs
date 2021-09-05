import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import {TypeOrmModule} from "@nestjs/typeorm"
import { BlogRepository } from "./blog.repository";
import { AuthModule } from "src/auth/auth.module";
import { CommentRepository } from "src/comment/comment.repository";
import { CommentService } from "src/comment/comment.service";
import { CommentModule } from "src/comment/comment.module";
@Module({
    imports : [TypeOrmModule.forFeature([BlogRepository, CommentRepository]), AuthModule],
    controllers : [BlogController],
    providers : [BlogService, CommentService],
    exports : [],
})
export class BlogModule{}