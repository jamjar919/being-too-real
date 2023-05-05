import fs from "fs";

type BeRealSession = {
    refresh_token: string,
    access_token: string
}

const SESSION_FILE_NAME = "session.json";

class Session {
    /** Singletons are an antipattern */
    public static session: Session | null = null;
    public static getSession() {
        if (this.session) {
            return this.session;
        }

        this.session = new Session();
        return this.session;
    }

    // Current access + refresh token
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    private constructor() {
        // Load session from file on first instance created
        this.loadSessionFromFile();
    }

    public updateSession(accessToken: string, refreshToken: string) {
        try {

            // Update session from file
            const data: string = JSON.stringify({
                access_token: accessToken,
                refresh_token: refreshToken
            });
            
            fs.writeFileSync(
                SESSION_FILE_NAME,
                data,
                { encoding: "utf8" }
            );

            // Reload the session to our variables
            this.setTokens(accessToken, refreshToken)
        } catch (err) {
            console.error("Failed to write BeReal session to file: ", err);
            throw err;
        }
    }

    public getAccessToken() {
        return this.accessToken;
    }

    public getRefreshToken() {
        return this.refreshToken;
    }

    private loadSessionFromFile(): void {
        try {
            const session = fs.readFileSync(SESSION_FILE_NAME, { encoding: "utf8" });
            const {
                access_token,
                refresh_token
            } = JSON.parse(session) as BeRealSession;

            console.log("Loaded session from file")

            this.setTokens(access_token, refresh_token)
        } catch (err) {
            console.error("Failed to load BeReal session from file: ", err);
            throw err;
        }
    }

    private setTokens(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

export { Session }