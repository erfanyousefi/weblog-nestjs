import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Blog } from "src/blog/blog.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: false })
    text: string
    @Column({ default: false })
    flag: boolean
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date
    @ManyToOne(_type => User, user => user.comments, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User
    @ManyToOne(_type => Blog, blog => blog.comments, { eager: false })
    @Exclude({ toPlainOnly: true })
    blog: Blog
}