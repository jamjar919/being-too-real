import {makeRequestToBeRealApi} from "./makeRequestToBeRealApi";
import {BeRealFriendFeedResponse} from "./type/BeRealFriendFeedResponse";
import {BeRealEndpoint} from "./type/BeRealEndpoint";

const getFriendFeed = () => makeRequestToBeRealApi<BeRealFriendFeedResponse>(
    BeRealEndpoint.FRIEND_FEED
)

const getMemories = () => makeRequestToBeRealApi(
    BeRealEndpoint.MEMORIES
)

export { getFriendFeed, getMemories }