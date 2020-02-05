import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Args,
  ArgsType,
  FieldResolver,
  Root
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcrypt";
import User, { UserCreateInput } from "../models/User";
import { Repository } from "typeorm";
import Post from "../models/Post";
import Comment from "../models/Comment";

@Resolver(of => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  @Query(returns => [User])
  async users() {
    return this.userRepository.find();
  }

  @Query(returns => User)
  async user(@Arg("id") id: number) {
    return this.userRepository.findOne(id);
  }

  @Mutation(returns => User)
  async createUser(@Arg("data") { username, password }: UserCreateInput) {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPass
    });
    return this.userRepository.save(newUser);
  }

  @FieldResolver()
  async posts(@Root() user: User) {
    return this.postRepository.find({ where: { author: { id: user.id } } });
  }

  @FieldResolver()
  async comments(@Root() user: User) {
    return this.commentRepository.find({ where: { author: { id: user.id } } });
  }
}
