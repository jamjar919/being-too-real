import {BeRealFriendFeedResponse} from "./type/BeRealFriendFeedResponse";
import {refreshToken} from "./firebase/refreshToken";

const fetch = require('node-fetch');

const headers = new fetch.Headers();
headers.append("User-Agent", "BeReal/0.35.0 (iPhone; iOS 16.0.2; Scale/2.00)");
headers.append("x-ios-bundle-identifier", "AlexisBarreyat.BeReal");

const requestOptions = {
    method: 'GET',
    headers: headers,
};

const MAX_TRIES = 5;

const getFriendFeed = (tries = 0): Promise<BeRealFriendFeedResponse> => {
    if (tries > MAX_TRIES) {
        throw new Error("Maximum tries exceeded!")
    }

    return fetch<BeRealFriendFeedResponse>("https://mobile.bereal.com/api/feeds/friends", requestOptions)
        .then(response => {
            if (response.status === 401) {
                // refresh the token and try again
                console.log("Received a 401 from the server")
                return refreshToken().then(() => getFriendFeed(tries + 1));
            }

            return response;
        })
        .then(response => response.json())
        .catch(error => {
            console.log('error', error);
            throw error;
        });
}

export { getFriendFeed }