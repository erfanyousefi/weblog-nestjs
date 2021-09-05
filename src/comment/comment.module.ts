import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Blog } from "src/blog/blog.entity";
import { BlogModule } from "src/blog/blog.module";
import { BlogRepository } from "src/blog/blog.repository";
import { BlogService } from "src/blog/blog.service";
import { CommentController } from "./comment.controller";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentRepository, BlogRepository]),AuthModule,
        BlogModule
    ],
    controllers: [CommentController],
    providers: [CommentService, BlogService],
    exports: [],
})
export class CommentModule {
    
}