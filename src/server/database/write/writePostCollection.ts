import {BeRealPostCollection} from "../../bereal-api/type/BeRealFriendFeedResponse";
import {writeUser} from "./writeUser";
import {writePost} from "./writePost";

const writePostCollection = async (postCollection: BeRealPostCollection) => {
    const {
        user,
        posts
    } = postCollection;

    if (!posts) {
        console.log("No posts in collection to write!")
        return;
    }

    // Write user
    await writeUser(user);

    // Write each post
    await Promise.all(
        posts!.map(post => writePost(user, post))
    )
}

export { writePostCollection }