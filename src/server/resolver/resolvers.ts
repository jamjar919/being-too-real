import {Maybe, Post, Resolvers, User,} from "../../graphql/generated/Resolver";
import {getMemories} from "../bereal-api/api";
import {postCollection, userCollection} from "../database/mongoClient";
import {MongoUser} from "../database/type/MongoUser";
import {mapDatabasePostToGraph} from "./converter/mapDatabasePostToGraph";
import {mapDatabaseUserToGraph} from "./converter/mapDatabaseUserToGraph";

const userResolver = async (userId: string): Promise<Maybe<User>> => {
    const maybeUser: MongoUser | null = await userCollection.findOne({ _id: userId })

    if (!maybeUser) {
        return null;
    }

    return mapDatabaseUserToGraph(maybeUser);
}

export const resolvers: Resolvers = {
    Query: {
        memories: async () => {
            const apiResponse = await getMemories();

            return apiResponse.data;
        },
        posts: async () => {
            return (await postCollection.find({}).toArray())
                .map(mapDatabasePostToGraph);
        },
        users: async () => {
            return (await userCollection.find({}).toArray())
                .map(mapDatabaseUserToGraph);
        },
        user: (_, args) => userResolver(args.id)
    },
    Post: {
        user: async (parent: Post): Promise<Maybe<User>> => userResolver(parent.userId)
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