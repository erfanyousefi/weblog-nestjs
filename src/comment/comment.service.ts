import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Blog } from "src/blog/blog.entity";
import { BlogIdDTO } from "src/blog/dto/id-blog.dto";
import { Comment } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDTO } from "./dto/create-comment.dto";

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) { }
    async findAllComments(): Promise<Comment[]> {
        const comments = await this.commentRepository.find();
        return comments
    }
    async findCommentByID(id): Promise<Comment> {
        const comment = await this.commentRepository.findOne({ id });
        if (!comment) throw new NotFoundException()
        return comment
    }
    async createComment(createCommentDto: CreateCommentDTO, user: User, blog: Blog): Promise<Comment> {
        const comment = await this.commentRepository.createComment(createCommentDto, user, blog);
        return comment
    }
    async ConfirmationComment(blogId : BlogIdDTO) {
        return await this.commentRepository.ConfirmationComment(blogId)
    }

}