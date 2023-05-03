import {Maybe, Post, QueryResolvers, Resolvers, User,} from "../../graphql/generated/Resolver";
import {getMemories} from "../bereal-api/api";
import {postCollection, userCollection} from "../database/mongoClient";
import {MongoUser} from "../database/type/MongoUser";
import {mapDatabasePostToGraph} from "./converter/mapDatabasePostToGraph";
import {mapDatabaseUserToGraph} from "./converter/mapDatabaseUserToGraph";

const memoryResolver: QueryResolvers["memories"] = async () => {
    const apiResponse = await getMemories();

    return apiResponse.data;
}

const postResolver: QueryResolvers["posts"] = async () => {
    return (await postCollection.find({}).toArray())
        .map(mapDatabasePostToGraph);
}

const userResolver: QueryResolvers["users"] = async () => {
    return (await userCollection.find({}).toArray())
        .map(mapDatabaseUserToGraph);
}

export const resolvers: Resolvers = {
    Query: {
        memories: memoryResolver,
        posts: postResolver,
        users: userResolver,
    },
    Post: {
        user: async (parent: Post): Promise<Maybe<User>> => {
            const userId = parent.userId;

            const maybeUser: MongoUser | null = await userCollection.findOne({ _id: userId })

            if (!maybeUser) {
                return null;
            }

            return mapDatabaseUserToGraph(maybeUser);
        }
    },
    User: {
        posts: async (parent: User): Promise<Post[]> => {
            const userId = parent.id;

            return postCollection.find({ user: userId })
                .toArray()
                .then((posts) => posts.map(mapDatabasePostToGraph));
        }
    }
}