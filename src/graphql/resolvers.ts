import {Resolvers} from "./generated/Resolver";
import {getMemories} from "../server/bereal-api/api";

export const resolvers: Resolvers = {
    Query: {
        memories: async () => {
            const apiResponse = await getMemories();

            return apiResponse.data;
        }
    },
}