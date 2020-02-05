import BaseModel from "./BaseModel";
import { ObjectType, Field, InputType } from "type-graphql";
import { Entity, Column, ManyToOne } from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity()
@ObjectType({ implements: BaseModel })
export default class Comment extends BaseModel {
  @Column()
  @Field()
  message: string;

  @ManyToOne(type => Post, postObj => postObj.comments)
  @Field(type => Post)
  post: Post;

  @ManyToOne(type => User, userObj => userObj.comments)
  @Field(type => User)
  author: User;
}

@InputType()
export class CreateCommentInput {

  @Field()
  message: string;
  
  @Field()
  postId: number;
 
  @Field()
  username: string;
}