import {Resolvers} from "./generated/Resolver";
import {getMemories} from "../bereal-api/api";

export const resolvers: Resolvers = {
    Query: {
        memories: async () => await getMemories() as any
    },
}