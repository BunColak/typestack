import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root
} from "type-graphql";
import Post, { PostCreateInput } from "../models/Post";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import User from "../models/User";
import Comment from "../models/Comment";

@Resolver(of => Post)
export default class PostResolver {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  @Query(returns => [Post])
  async posts() {
    return this.postRepository.find({ relations: ["author"] });
  }

  @Query(returns => Post)
  async post(@Arg("id") id: number) {
    return this.postRepository.findOne(id, { relations: ["author"] });
  }

  @Mutation(returns => Post)
  async createPost(@Arg("data") { content, username }: PostCreateInput) {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user) throw "ERROR";

      const newPost = this.postRepository.create({ content, author: user });
      return this.postRepository.save(newPost);
    } catch (error) {
      throw error;
    }
  }

  @FieldResolver()
  async author(@Root() post: Post) {
    return this.userRepository.findOne(post.author.id);
  }

  @FieldResolver()
  async comments(@Root() post: Post) {
    return this.commentRepository.find({ where: { post: { id: post.id } } });
  }
}
