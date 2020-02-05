import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import BaseModel from "./BaseModel";
import User from "./User";
import { Length } from "class-validator";
import Comment from "./Comment";

@Entity()
@ObjectType({implements: BaseModel})
export default class Post extends BaseModel {

    @Column()
    @Field()
    content: string;

    @ManyToOne(type => User, user => user.posts)
    @Field(type => User)
    author: User

    @OneToMany(type => Comment, comment => comment.post)
    @Field(type => [Comment])
    comments: Comment[]
}

@InputType()
export class PostCreateInput {

    @Field()
    @Length(10)
    content: string;

    @Field()
    username: string; 
}