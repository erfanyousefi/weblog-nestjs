import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Blog } from "src/blog/blog.entity";
import { EntityRepository, Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { CreateCommentDTO } from "./dto/create-comment.dto";
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    async createComment(createCommentDto: CreateCommentDTO, user: User, blog : Blog) : Promise<Comment>{
        let {text} = createCommentDto;
        const comment = await this.create({text, flag : false, user, blog})
        const result = await this.save(comment).then(comment => {
            return comment
        }).catch(error => {
            throw new InternalServerErrorException()
        })

        return result;
    }
    async ConfirmationComment(blogId): Promise<Comment> {
        const {id} = blogId
        const comment = await this.findOne({id});
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