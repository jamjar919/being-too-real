import {BeRealPostCollection} from "../../bereal-api/type/BeRealFriendFeedResponse";
import {writeUser} from "./writeUser";
import {writePost} from "./writePost";

const writePostCollection = async (postCollection: BeRealPostCollection): Promise<{ user: string, posts: string[] } | null> => {
    const {
        user,
        posts
    } = postCollection;

    if (!posts) {
        return null;
    }

    // Write user
    await writeUser(user);

    // Write each post
    const postsWritten = await Promise.all(
        posts!.map(post => writePost(user, post))
    )

    return {
        user: user.username,
        posts: postsWritten
            .filter((written: string | null) => written !== null)
            .map((written) => written!)
    }
}

export { writePostCollection }