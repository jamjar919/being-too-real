import {BeRealFriendFeedResponse} from "./type/BeRealFriendFeedResponse.js";

import fetch, {Response} from "node-fetch";
import {RefreshTokenResponse} from "./firebase/type/RefreshTokenResponse.js";
import {refreshToken} from "./firebase/refreshToken.js";

// Maximum number of tries to hit the endpoint
const MAX_TRIES = 5;

// Access token for the BeReal servers.
let accessToken: string | null = null;

const getFriendFeed = (tries = 0): Promise<BeRealFriendFeedResponse> => {
    if (tries > MAX_TRIES) {
        throw new Error("Maximum tries exceeded!")
    }

    if (!accessToken) {
        accessToken = process.env.ACCESS_TOKEN || null;
    }

    const headers = {
        "User-Agent": "BeReal/0.35.0 (iPhone; iOS 16.0.2; Scale/2.00)",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "Authorization": `Bearer ${accessToken}`
    }

    const requestOptions = {
        method: 'GET',
        headers: headers,
    };

    return fetch("https://mobile.bereal.com/api/feeds/friends", requestOptions)
        .then((response: Response) => {
            if (response.status === 401) {
                // refresh the token and try again
                console.log("Received a 401 from the server")
                return refreshToken().then((refreshResponse: RefreshTokenResponse) => {
                    accessToken = refreshResponse.access_token;
                    return getFriendFeed(tries + 1)
                });
            }

            console.log("Got data")

            return response.json() as Promise<BeRealFriendFeedResponse>;
        })
}

export { getFriendFeed }