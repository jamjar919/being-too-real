import {BeRealPost} from "../../bereal-api/type/BeRealFriendFeedResponse";
import {postCollection} from "../mongoClient";
import {BeRealUser} from "../../bereal-api/type/BeRealCommon";
import {MongoPost} from "../type/MongoPost";
import {convertPost} from "../converter/convertPost";

const writePost = async (
    user: BeRealUser,
    post: BeRealPost
): Promise<string | null> => {
    const document: MongoPost = convertPost(user, post);

    const maybePost = await postCollection.findOne({ _id: document._id });

    // If we already wrote the post don't write it again
    if (maybePost) {
        return null;
    }

    return postCollection.insertOne(document)
        .then(insert => insert.insertedId);
}

export { writePost }