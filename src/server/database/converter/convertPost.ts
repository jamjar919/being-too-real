import {MongoPost} from "../type/MongoPost";
import {BeRealUser} from "../../bereal-api/type/BeRealCommon";
import {BeRealPost} from "../../bereal-api/type/BeRealFriendFeedResponse";
import {convertImage} from "./convertImage";
import {convertLocation} from "./convertLocation";

const convertPost = (
    user: BeRealUser,
    post: BeRealPost
): MongoPost => ({
    // Unique post id
    _id: post.id,

    // Unique user id for the user that made the post
    user: user.id,

    // Fields from the BeReal API
    primary: convertImage(post.primary),
    secondary: convertImage(post.secondary),
    location: post.location ? convertLocation(post.location) : null,
    retakeCounter: post.retakeCounter,
    lateInSeconds: post.lateInSeconds,
    isLate: post.isLate,
    isMain: post.isMain,
    takenAt: post.takenAt,
    creationDate: post.creationDate,
    updatedAt: post.updatedAt,
    caption: post.caption,
});

// Extra fields we aren't storing for now
//
// realMojis?: (RealMojisEntity)[] | null,
// comments?: (CommentsEntity | null)[] | null,
// screenshots?: (null)[] | null,
// music: post.music,

export { convertPost }