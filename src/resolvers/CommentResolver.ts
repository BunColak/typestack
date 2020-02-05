import { Resolver, Query, Arg, Mutation } from "type-graphql";
import Comment, { CreateCommentInput } from "../models/Comment";
import { InjectRepository } from "typeorm-typedi-extensions";
import User from "../models/User";
import Post from "../models/Post";
import { Repository } from "typeorm";

@Resolver(of => Comment)
export default class CommentResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  @Query(returns => [Comment])
  async comments() {
      return this.commentRepository.find()
  }

  @Query(returns => Comment)
  async comment(@Arg('id') id: number) {
      return this.commentRepository.findOne(id)
  }

  @Mutation(returns => Comment)
  async createComment(@Arg('data') {message, postId, username} : CreateCommentInput) {
      try {
          const author = await this.userRepository.findOne({where: {username}})
          const post = await this.postRepository.findOne(postId)
          const newComment = this.commentRepository.create({message, author, post})
          return this.commentRepository.save(newComment)
      } catch (error) {
          console.log(error);
      }
  }
}
