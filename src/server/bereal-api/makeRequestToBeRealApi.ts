import fetch, {Response} from "node-fetch";
import {refreshBeRealToken} from "./auth/refreshBeRealToken";
import {BeRealEndpoint} from "./type/BeRealEndpoint";
import {Session} from "../util/session";

// Maximum number of tries to hit the endpoint
const MAX_TRIES = 3;

const BEREAL_API_URL = 'https://mobile.bereal.com/api/'

const makeRequestToBeRealApi = <ResponseType>(
    endpoint: BeRealEndpoint,
    tries = 0
): Promise<ResponseType> => {
    if (tries > MAX_TRIES) {
        throw new Error("Maximum tries exceeded!")
    }

    const accessToken = Session.getSession().getAccessToken();

    const headers = {
        "User-Agent": "BeReal/0.35.0 (iPhone; iOS 16.0.2; Scale/2.00)",
        "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
        "Authorization": `Bearer ${accessToken}`
    }

    const requestOptions = {
        method: 'GET',
        headers: headers,
    };

    return fetch(BEREAL_API_URL + endpoint, requestOptions)
        .then((response: Response) => {
            if (response.status === 401) {
                // refresh the token and try again
                console.log("Received a 401 from the server")
                return refreshBeRealToken().then(() => {

                    // Retry the request
                    return makeRequestToBeRealApi(endpoint,tries + 1)
                });
            }

            console.log("Got data for " + endpoint)

            return response.json() as Promise<ResponseType>;
        })
}

export { makeRequestToBeRealApi }