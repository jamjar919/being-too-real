import fetch, {Response} from "node-fetch";
import {BeRealRefreshTokenResponse} from "./type/BeRealRefreshTokenResponse";
import {Session} from "../../util/session";

const refreshBeRealToken = (): Promise<BeRealRefreshTokenResponse> => {
    const clientSecret = process.env.CLIENT_SECRET;

    if (!clientSecret) {
        throw new Error("Environment variable CLIENT_SECRET missing!")
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "grant_type": "refresh_token",
            "client_id": "ios",
            "client_secret": clientSecret,
            "refresh_token": Session.getSession().getRefreshToken()
        })
    };

    return fetch(`https://auth.bereal.team/token?grant_type=refresh_token`, requestOptions)
        .then((response: Response) => response.json() as Promise<BeRealRefreshTokenResponse>)
        .then((data: BeRealRefreshTokenResponse) => {

            if (!data || !data?.refresh_token || !data?.access_token) {
                console.error("Refresh response did not contain the correct tokens", data)
                throw new Error("Error refreshing session")
            }

            // Update session
            console.log('BeReal authentication token refreshed successfully.');
            Session.getSession().updateSession(data.access_token, data.refresh_token);

            return data;
        })
};

export { refreshBeRealToken }
