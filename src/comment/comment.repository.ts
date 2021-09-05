import { ForbiddenException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { User } from "src/auth/user.entity";
import { Blog } from "src/blog/blog.entity";
import { EntityRepository, Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { CreateCommentDTO } from "./dto/create-comment.dto";
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    async createComment(createCommentDto: CreateCommentDTO, user: User, blog : Blog) : Promise<Comment>{
        let {text} = createCommentDto;
        const userComments = await (await this.find({user})).length
        if(userComments >= 10) throw new ForbiddenException("Each use can not send more than 10 comment for each blog")
        const comment = await this.create({text, flag : false, user, blog})
        const result = await this.save(comment).then(comment => {
            return comment
        }).catch(error => {
            throw new InternalServerErrorException()
        })

        return result;
    }
    async ConfirmationComment(commentId): Promise<Comment> {
        const {id} = commentId
        const comment = await this.findOne({id});
        if(!comment) throw new NotFoundException('Not Found Comment with id : ' + id)
        comment.flag = true;
        const response = await this.save(comment)
        .then(comment => {
            return comment
        })
        .catch(error => {
            throw new InternalServerErrorException()
        })
        return response
    }
}