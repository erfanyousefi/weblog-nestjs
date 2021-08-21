import { Blog } from "./blog.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
    async createBlog(createBlogDto : CreateBlogDTO) : Promise<Blog>{
        let {title, description, image, author} = createBlogDto;
       const blog = this.create({title, description, image, author });
       await this.save(blog);
       return blog
    }
    async updateBlog(id, updateBlogDto : UpdateBlogDTO) : Promise<Blog>{
        await this.update(id, {...updateBlogDto})
        return this.findOne(id)
    }
}