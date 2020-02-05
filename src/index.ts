import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { GraphQLServer } from 'graphql-yoga'
import UserResolver from './resolvers/UserResolver'

import { Container } from "typedi";
import * as TypeORM from "typeorm";
import PostResolver from './resolvers/PostResolver';
import CommentResolver from './resolvers/CommentResolver';
TypeORM.useContainer(Container)

createConnection().then(async () => {

    const {typeDefs, resolvers} = await buildTypeDefsAndResolvers({
        resolvers: [UserResolver, PostResolver, CommentResolver],
        container: Container
    })

    const server = new GraphQLServer({ typeDefs, resolvers })
    server.start(() => console.log('Server is running on localhost:4000'))
}).catch(e => {
    console.log(e);
})