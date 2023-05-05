import {BeRealFriendFeedResponse} from "../../bereal-api/type/BeRealFriendFeedResponse";
import {writePostCollection} from "./writePostCollection";

const writeFriendsResponse = async (
    response: BeRealFriendFeedResponse
) => {
    const {
        userPosts,
        friendsPosts
    } = response;

    console.log("🌍 Writing any new posts to the database...")

    if (!friendsPosts || !userPosts) {
        console.log("No friends have posted!")
        return;
    }

    // Write your own posts to the log
    const userResult = await writePostCollection(userPosts);

    if (userResult) {
        const { user: me, posts: myPosts } = userResult;

        if (myPosts.length > 0) {
            console.log(`👤 Saved ${myPosts.length} posts from ${me}`);
        }
    }

    // Write your friends posts
    const friendResults = await Promise.all(
        friendsPosts.map(friendsPosts => writePostCollection(friendsPosts))
    )

    friendResults.forEach((friendResult) => {
        if (friendResult) {
            const { user, posts } = friendResult;

            if (posts.length > 0) {
                console.log(`👥 Saved ${posts.length} posts from ${user}`);
            }
        }
    })

    console.log("🌍 Done!")
}


export { writeFriendsResponse }