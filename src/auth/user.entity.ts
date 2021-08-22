import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id : string;
    @Column({nullable : true})
    name : string;
    @Column({nullable : false, unique : true})
    email : string;
    @Column({nullable : false})
    password : string
    @CreateDateColumn({name : 'created_at', type : 'timestamp'})
    createdAt : Date;
    @UpdateDateColumn({name : 'updated_at', type : 'timestamp'})
    updatedAt : Date
    @Column({default : ""})
    token : string
}