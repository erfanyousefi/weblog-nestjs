import { Injectable, NotFoundException } from "@nestjs/common";
import { Blog } from "./blog.entity";
import { BlogRepository } from "./blog.repository";
import { InjectRepository } from "@nestjs/typeorm"
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";
@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogRepository) private readonly blogRepository: BlogRepository) { }
    public async getAllBlogs(): Promise<Blog[]> {
        const blogs = await this.blogRepository.find({});
        return blogs
    }
    public async getBlogById(id: string): Promise<Blog> {
        const blog = await this.blogRepository.findOne(id);
        if (!blog) throw new NotFoundException(`Not Found Blog with id : ${id}`)
        return blog;
    }
    public async createBlog(createBlogDto: CreateBlogDTO): Promise<Blog> {
        const blog = this.blogRepository.createBlog(createBlogDto);
        return blog
    }
    public async deleteBlogById(id): Promise<Blog> {
        const blog = await this.getBlogById(id);
        await this.blogRepository.delete(blog.id)
        return blog;
    }
    public async updateBlog(id, updateBlogDto: UpdateBlogDTO): Promise<Blog> {
        return this.blogRepository.updateBlog(id, updateBlogDto);
    }
}