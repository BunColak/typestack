import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import { Length, MinLength } from "class-validator";
import BaseModel from "./BaseModel";
import Post from "./Post";
import Comment from "./Comment";

@Entity()
@ObjectType({ implements: BaseModel })
export default class User extends BaseModel {
  @Column()
  @Field()
  username: string;

  @Column()
  password: string;

  @OneToMany(
    type => Post,
    post => post.author
  )
  @Field(type => [Post], { nullable: true })
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.author)
  @Field(type => [Comment])
  comments: Comment[]
}

@InputType()
export class UserCreateInput {
  @Field()
  @MinLength(3)
  username: string;

  @Field()
  @Length(4)
  password: string;
}
