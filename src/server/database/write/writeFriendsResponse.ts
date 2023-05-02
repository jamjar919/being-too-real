import {BeRealFriendFeedResponse} from "../../bereal-api/type/BeRealFriendFeedResponse";
import {writePostCollection} from "./writePostCollection";

const writeFriendsResponse = async (
    response: BeRealFriendFeedResponse
) => {
    const {
        userPosts,
        friendsPosts
    } = response;

    if (!friendsPosts) {
        console.log("No friends have posted!")
        return;
    }

    // Write your own posts to the log
    await writePostCollection(userPosts);

    // Write your friends posts
    await Promise.all(
        friendsPosts.map(friendsPosts => writePostCollection(friendsPosts))
    )
}

export { writeFriendsResponse }