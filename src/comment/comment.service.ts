import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Blog } from "src/blog/blog.entity";
import { Comment } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { GetIdDTO } from "./dto/get-id.dto";

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
    async ConfirmationComment(commentId: GetIdDTO) {
        return await this.commentRepository.ConfirmationComment(commentId)
    }
    async DeleteCommentByID(commentId: GetIdDTO, user: User) {
        const { id } = commentId;
        const comment = await this.commentRepository.findOne({ id, user })
        if(!comment) throw new NotFoundException()
        await this.commentRepository.remove(comment)
        return comment
    }

}