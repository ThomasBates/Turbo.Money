
const config = {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    authUrl: 'https://www.facebook.com/v19.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v19.0/oauth/access_token',
    userUrl: 'https://graph.facebook.com/me',
    refreshUrl: 'https://graph.facebook.com/v19.0/oauth/access_token',
    redirectUrl: process.env.OAUTH_REDIRECT_URL,
}

const strategy = {
    auth: {
        url: config.authUrl,
        params: {
            client_id: config.clientId,
            redirect_uri: config.redirectUrl,
            response_type: 'code',
            scope: 'openid email public_profile',
            state: '{st=state123abc,ds=123456789}',
        },
    },
    token: {
        getHttp: (code) => {
            return {
                url: config.tokenUrl,
                data: {
                    client_id: config.clientId,
                    redirect_uri: config.redirectUrl,
                    client_secret: config.clientSecret,
                    code: code,
                },
                config: {},
            };
        },
        getTokens: (data) => {
            return {
                accessToken: data.access_token,
                refreshToken: data.access_token,
            };
        }
    },
    user: {
        getHttp: (accessToken) => {
            return {
                url: config.userUrl,
                config: {
                    params: {
                        fields: 'id,name,email,picture',
                        access_token: accessToken
                    }
                }
            }
        },
        getUser: (data) => {
            return {
                name: data.name,
                email: data.email || '',
                picture: data.picture.data.url,
                authorization: {
                    source: 'facebook',
                    sourceId: data.id,
                }
            };
        }
    },
    refresh: {
        getHttp: (refreshToken) => {
            return {
                url: config.refreshUrl,
                data: {
                    grant_type: 'fb_exchange_token',
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    fb_exchange_token: refreshToken,
                },
                config: {},
            };
        },
        getTokens: (data, refreshToken) => {
            return {
                accessToken: data.access_token,
                refreshToken: data.access_token,
            };
        }
    },
};

module.exports = (logger) => require('./CommonStrategy')(logger, strategy);
