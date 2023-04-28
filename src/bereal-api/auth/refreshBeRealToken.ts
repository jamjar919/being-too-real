import fetch, {Response} from "node-fetch";
import {BeRealRefreshTokenResponse} from "./type/BeRealRefreshTokenResponse";

const refreshBeRealToken = (): Promise<BeRealRefreshTokenResponse> => {
    const currentRefreshToken = process.env.BEREAL_REFRESH_TOKEN;
    const clientSecret = process.env.CLIENT_SECRET;

    if (!clientSecret) {
        throw new Error("Environment variable CLIENT_SECRET missing!")
    }

    if (!currentRefreshToken) {
        throw new Error("Environment variable BEREAL_REFRESH_TOKEN missing!")
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "grant_type": "refresh_token",
            "client_id": "ios",
            "client_secret": clientSecret,
            "refresh_token": currentRefreshToken
        })
    };

    return fetch(`https://auth.bereal.team/token?grant_type=refresh_token`, requestOptions)
        .then((response: Response) => response.json() as Promise<BeRealRefreshTokenResponse>)
        .then((data: BeRealRefreshTokenResponse) => {
            console.log('BeReal authentication token refreshed successfully.');
            return data;
        })
};

export { refreshBeRealToken }
