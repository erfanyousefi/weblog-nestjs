import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { BlogModule } from "src/blog/blog.module";
import { BlogRepository } from "src/blog/blog.repository";
import { BlogService } from "src/blog/blog.service";
import { CommentController } from "./comment.controller";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentRepository]),
        AuthModule,
        BlogModule,
    ],
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule {
    
}