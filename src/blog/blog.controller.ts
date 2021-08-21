import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Blog } from "./blog.entity";
import { BlogService } from "./blog.service";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { BlogIdDTO } from "./dto/id-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }
    @Get()
    public getAllBlogs(): Promise<Blog[]> {
        const blogs = this.blogService.getAllBlogs();
        return blogs;
    }
    @Get(":id")
    public getBlogById(@Param() blogIdDto: BlogIdDTO): Promise<Blog> {
        let { id } = blogIdDto;
        return this.blogService.getBlogById(id)
    }
    @Post()
    public createBlog(@Body() createBlogDto: CreateBlogDTO): Promise<Blog> {
        return this.blogService.createBlog(createBlogDto)
    }
    @Delete(":id")
    public deleteBlogById(@Param() blogIdDto: BlogIdDTO): Promise<Blog> {
        let { id } = blogIdDto;
        return this.blogService.deleteBlogById(id)
    }
    @Patch(':id')
    public async updateBlog(@Param() blogID: BlogIdDTO, @Body() updateBlogDto: UpdateBlogDTO): Promise<Blog> {
        const blog = await this.getBlogById(blogID)
        console.log(updateBlogDto);
        return this.blogService.updateBlog(blog.id, updateBlogDto)
        
    }
}