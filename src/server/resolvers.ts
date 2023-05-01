import {Resolvers} from "../graphql/generated/Resolver";
import {getFriendFeed, getMemories} from "./bereal-api/api";

export const resolvers: Resolvers = {
    Query: {
        memories: async () => {
            const apiResponse = await getMemories();

            return apiResponse.data;
        },
        posts: async () => {
            const apiResponse = await getFriendFeed();

            return apiResponse.map(a => a);
        },
    },
}