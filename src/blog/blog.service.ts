import { Injectable, NotFoundException } from "@nestjs/common";
import { Blog } from "./blog.entity";
import { BlogRepository } from "./blog.repository";
import { InjectRepository } from "@nestjs/typeorm"
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";
import { User } from "src/auth/user.entity";
import { CommentRepository } from "src/comment/comment.repository";
@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogRepository) private readonly blogRepository: BlogRepository,
        @InjectRepository(CommentRepository) private readonly commentRepository: CommentRepository
        ) { }
    public async getAllBlogs(user): Promise<Blog[]> {
        const blogs = await this.blogRepository.find({ where: { user } })
        return blogs
    }
    public async getBlogById(id: string, user): Promise<Blog> {
        const blog = await this.blogRepository.findOne({ where: { id, user } });
        if (!blog) throw new NotFoundException(`Not Found Blog with id : ${id}`)
        return blog;
    }
    public async createBlog(createBlogDto: CreateBlogDTO, user: User): Promise<Blog> {
        const blog = this.blogRepository.createBlog(createBlogDto, user);
        return blog
    }
    public async deleteBlogById(id, user: User): Promise<Blog> {
        const blog = await this.getBlogById(id, user);
        await this.commentRepository.delete({blog})
        await this.blogRepository.remove(blog);
        return blog;
    }
    public async updateBlog(id, updateBlogDto: UpdateBlogDTO, user: User): Promise<Blog> {
        return this.blogRepository.updateBlog(id, updateBlogDto, user);
    }
}