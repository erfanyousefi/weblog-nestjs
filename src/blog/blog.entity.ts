import { Timestamp } from "rxjs";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"

@Entity({name : "blog"})
export class Blog{
    @PrimaryGeneratedColumn('uuid')
    id : string;
    @Column({nullable : true})
    image : string;
    @Column({nullable : false})
    title : string;
    @Column({nullable : false})
    description : string;
    @Column()
    author : string;
    @CreateDateColumn({type : 'timestamp', name : 'created_at'})
    createdAt : Date
    @UpdateDateColumn({type : 'timestamp' , name : 'updated_at'})
    updatedAt : Date
}