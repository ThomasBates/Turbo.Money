
const config = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
    refreshUrl: 'https://www.googleapis.com/oauth2/v3/token',
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,
}

const strategy = {
    auth: {
        url: config.authUrl,
        params: {
            client_id: config.clientId,
            redirect_uri: config.redirectUrl,
            response_type: 'code',
            scope: 'openid profile email',
            access_type: 'offline',
            state: 'standard_oauth',
            prompt: 'consent',
        },
    },
    token: {
        getHttp: (code) => {
            return {
                url: config.tokenUrl,
                data: {
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    code: code,
                    grant_type: 'authorization_code',
                    redirect_uri: config.redirectUrl,
                },
                config: {},
            };
        },
        getTokens: (data) => {
            return {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
            };
        }
    },
    user: {
        getHttp: (accessToken) => {
            return {
                url: config.userUrl,
                config: {
                    params: {
                        access_token: accessToken
                    }
                }
            }
        },
        getUser: (data) => {
            return {
                name: data.name,
                email: data.email,
                picture: data.picture,
                authorization: {
                    source: 'google',
                    sourceId: data.sub,
                }
            };
        }

    },
    refresh: {
        getHttp: (refreshToken) => {
            return {
                url: config.refreshUrl,
                data: {
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    refresh_token: refreshToken,
                    grant_type: 'refresh_token'
                },
                config: {},
            };
        },
        getTokens: (data, refreshToken) => {
            return {
                accessToken: data.access_token,
                refreshToken: refreshToken,
            };
        }
    },
};

module.exports = (logger, errors) => require('./CommonStrategy')(logger, errors, strategy);
