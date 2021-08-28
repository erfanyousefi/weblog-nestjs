import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { BlogService } from "src/blog/blog.service";
import { BlogIdDTO } from "src/blog/dto/id-blog.dto";
import { Comment } from "./comment.entity";
import { CommentService } from "./comment.service";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { GetIdDTO } from "./dto/get-id.dto";

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private blogService: BlogService) { }
    @Post(':id')
    async createComment(@Param() getID: GetIdDTO, @Body() createCommentDto: CreateCommentDTO, @Req() req) {
        const user = req.user;
        const blog = await this.blogService.getBlogById(getID.id, user)
        return this.commentService.createComment(createCommentDto, user, blog)
    }
    @Get()
    findAllComments(): Promise<Comment[]> {
        return this.commentService.findAllComments()
    }
    @Get(':id')
    findCommentByID(@Param() blogID: BlogIdDTO): Promise<Comment> {
        const { id } = blogID
        return this.commentService.findCommentByID(id)
    }
    @Patch(':id')
    ConfirmationComment(@Param() blogID: BlogIdDTO): Promise<Comment> {
        return this.commentService.ConfirmationComment(blogID)
    }
    @Delete(":id")
    DeleteComment(@Param() commentId : GetIdDTO, @Req() req){
        const user = req.user;
        return this.commentService.DeleteCommentByID(commentId, user)
    }
}