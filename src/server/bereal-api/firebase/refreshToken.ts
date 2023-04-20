import {RefreshTokenResponse} from "./type/RefreshTokenResponse";

const fetch = require('node-fetch');

const apiKey = '<your Firebase API key>';
const refreshTokenUrl = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;

const refreshToken = (refreshToken: string): Promise<RefreshTokenResponse> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    };

    return fetch<RefreshTokenResponse>(refreshTokenUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Token refreshed successfully.');
            return data.access_token;
        })
        .catch(error => {
            console.log('Error refreshing token:', error);
            throw error;
        });
};

export { refreshToken }
