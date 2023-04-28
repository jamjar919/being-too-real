import {RefreshTokenResponse} from "./type/RefreshTokenResponse";
import fetch, {Response} from "node-fetch";

const refreshFirebaseToken = (): Promise<RefreshTokenResponse> => {
    const apiKey = process.env.GOOGLE_API_TOKEN;
    const currentRefreshToken = process.env.FIREBASE_REFRESH_TOKEN;

    if (!apiKey) {
        throw new Error("Environment variable GOOGLE_API_TOKEN missing!")
    }

    if (!currentRefreshToken) {
        throw new Error("Environment variable REFRESH_TOKEN missing!")
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: currentRefreshToken
        })
    };

    return fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, requestOptions)
        .then((response: Response) => response.json() as Promise<RefreshTokenResponse>)
        .then((data: RefreshTokenResponse) => {
            console.log('Token refreshed successfully.');
            return data;
        })
};

export { refreshFirebaseToken }
