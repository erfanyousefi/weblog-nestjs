import { Blog } from "./blog.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
    async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<Blog> {
        let { title, description, image } = createBlogDto;
        const blog = this.create({ title, description, image, user });
        let response = await this.save(blog).then(user => {
            return user
        }).catch(error => {
            throw new InternalServerErrorException()
        })
        return response
    }
    async updateBlog(id, updateBlogDto: UpdateBlogDTO): Promise<Blog> {
        await this.update(id, { ...updateBlogDto })

        return this.findOne(id)
    }
}