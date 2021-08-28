import { Blog } from "./blog.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";
import { User } from "src/auth/user.entity";
import { ForbiddenException, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
    async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<Blog> {
        let userBlogCount = await (await this.find({ where: { user } })).length
        if (userBlogCount < 10) {
            let { title, description, image } = createBlogDto;
            const blog = this.create({ title, description, image, user });
            let response = await this.save(blog).then(user => {
                return user
            }).catch(error => {
                throw new InternalServerErrorException()
            })
            return response
        } else {
            throw new ForbiddenException("Each user can not save more than 10 blogs")
        }
    }
    async updateBlog(id, updateBlogDto: UpdateBlogDTO, user: User): Promise<Blog> {
        if (updateBlogDto['user']) {
            delete updateBlogDto['user']
        }
        await this.update({ id, user }, { ...updateBlogDto })
        return this.findOne({id})
    }
}