import {Post, Resolvers} from "../graphql/generated/Resolver";
import {getFriendFeed, getMemories} from "./bereal-api/api";
import {BeRealPost, BeRealPostCollection} from "./bereal-api/type/BeRealFriendFeedResponse";

export const resolvers: Resolvers = {
    Query: {
        memories: async () => {
            const apiResponse = await getMemories();

            return apiResponse.data;
        },
        posts: async () => {
            const apiResponse = await getFriendFeed();

            if (!apiResponse.friendsPosts) {
                return [];
            }

            return apiResponse.friendsPosts.flatMap((postCollection: BeRealPostCollection) => {
                const posts: Post[] = [];

                postCollection.posts?.forEach((post: BeRealPost) => {
                    posts.push({
                        id: post.id,
                        location: post.location,
                        user: postCollection.user
                    })
                })

                return posts;
            });
        },
    },
}