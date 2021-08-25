import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/auth/user.entity";
import { Blog } from "./blog.entity";
import { BlogService } from "./blog.service";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { BlogIdDTO } from "./dto/id-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }
    @Get()
    @UseGuards(AuthGuard())
    public getAllBlogs(@Req() req): Promise<Blog[]> {
        const user = req.user
        const blogs = this.blogService.getAllBlogs(user);
        return blogs;
    }
    @Get(":id")
    public getBlogById(@Param() blogIdDto: BlogIdDTO): Promise<Blog> {
        let { id } = blogIdDto;
        return this.blogService.getBlogById(id)
    }
    @Post()
    @UseGuards(AuthGuard())
    public createBlog(@Body() createBlogDto: CreateBlogDTO, @Req() req): Promise<Blog> {
        const user = req.user
        return this.blogService.createBlog(createBlogDto, user)
    }
    @Delete(":id")
    public deleteBlogById(@Param() blogIdDto: BlogIdDTO): Promise<Blog> {
        let { id } = blogIdDto;
        return this.blogService.deleteBlogById(id)
    }
    @Patch(':id')
    public async updateBlog(@Param() blogID: BlogIdDTO, @Body() updateBlogDto: UpdateBlogDTO): Promise<Blog> {
        const blog = await this.getBlogById(blogID)
        return this.blogService.updateBlog(blog.id, updateBlogDto)

    }
}