import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import {TypeOrmModule} from "@nestjs/typeorm"
import { BlogRepository } from "./blog.repository";
import { AuthModule } from "src/auth/auth.module";
@Module({
    imports : [TypeOrmModule.forFeature([BlogRepository]), AuthModule],
    controllers : [BlogController],
    providers : [BlogService],
})
export class BlogModule{}