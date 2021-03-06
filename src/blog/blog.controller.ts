import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CommentService } from "src/comment/comment.service";
import { Blog } from "./blog.entity";
import { BlogService } from "./blog.service";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { BlogIdDTO } from "./dto/id-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";

@Controller('panel/blogs')
@UseGuards(AuthGuard())
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly commentService: CommentService) { }
    @Get()
    public getAllBlogs(@Req() req): Promise<Blog[]> {
        const user = req.user
        const blogs = this.blogService.getAllBlogs(user);
        return blogs;
    }
    @Get(":id")
    public getBlogById(@Param() blogIdDto: BlogIdDTO, @Req() req): Promise<Blog> {
        const user = req.user
        let { id } = blogIdDto;
        return this.blogService.getBlogById(id, user)
    }
    @Post()
    public createBlog(@Body() createBlogDto: CreateBlogDTO, @Req() req): Promise<Blog> {
        const user = req.user
        return this.blogService.createBlog(createBlogDto, user)
    }
    @Delete(":id")
    public deleteBlogById(@Param() blogIdDto: BlogIdDTO, @Req() req): Promise<Blog> {
        const user = req.user
        let { id } = blogIdDto;
        return this.blogService.deleteBlogById(id, user)
    }
    @Patch(':id')
    public async updateBlog(@Param() blogID: BlogIdDTO, @Body() updateBlogDto: UpdateBlogDTO, @Req() req): Promise<Blog> {
        const user = req.user
        const { id } = blogID
        const blog = await this.blogService.getBlogById(id, user)
        return this.blogService.updateBlog(blog.id, updateBlogDto, user)
    }
}