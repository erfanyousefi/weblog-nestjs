import { Blog } from "src/blog/blog.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: true })
    name: string;
    @Column({ nullable: false, unique: true })
    email: string;
    @Column({ nullable: false })
    password: string
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date
    @Column({ default: "" })
    token: string
    @OneToMany((_type) => Blog, blog => blog.user, { eager: true })
    blogs: Blog[]
}