import {makeRequestToBeRealApi} from "./makeRequestToBeRealApi";
import {BeRealFriendFeedResponse} from "./type/BeRealFriendFeedResponse";
import {BeRealEndpoint} from "./type/BeRealEndpoint";
import {BeRealMemoriesResponse} from "./type/BeRealMemoriesResponse";

const getFriendFeed = () => makeRequestToBeRealApi<BeRealFriendFeedResponse>(
    BeRealEndpoint.FRIEND_FEED
)

const getMemories = () => makeRequestToBeRealApi<BeRealMemoriesResponse>(
    BeRealEndpoint.MEMORIES
)

export { getFriendFeed, getMemories }