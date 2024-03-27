
const config = {
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    userUrl: 'https://api.twitter.com/2/users/me',
    refreshUrl: 'https://api.twitter.com/2/oauth2/token',
    redirectUrl: process.env.OAUTH_REDIRECT_URL,
}

let state = {
    codeChallenge: null,
    codeVerifier: null,
    encodedAuthToken: null,
}

function getCodeChallenge() {
    if (!state.codeChallenge) {
        //  TODO: Create my own code_challenge & code_verifier.
        //code_challenge = hashlib.sha256(code_verifier.encode("utf-8")).digest()
        //code_challenge = base64.urlsafe_b64encode(code_challenge).decode("utf-8")
        //code_challenge = code_challenge.replace("=", "")

        state.codeChallenge = "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8";
    }
    return state.codeChallenge;
}

function getCodeVerifier() {
    if (!state.codeVerifier) {
        //  TODO: Create my own code_challenge & code_verifier.
        //code_verifier = base64.urlsafe_b64encode(os.urandom(30)).decode("utf-8")
        //code_verifier = re.sub("[^a-zA-Z0-9]+", "", code_verifier)

        state.codeVerifier = "8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA";
    }
    return state.codeVerifier;
}

function getEncodedAuthToken() {
    if (!state.encodedAuthToken) {
        const basicAuthToken = `${config.clientId}:${config.clientSecret}`;
        state.encodedAuthToken = Buffer.from(basicAuthToken, "utf8").toString("base64");
    }

    return state.encodedAuthToken;
}

const strategy = {
    auth: {
        url: config.authUrl,
        params: {
            response_type: 'code',
            client_id: config.clientId,
            redirect_uri: config.redirectUrl,
            scope: 'tweet.read users.read offline.access',
            state: 'state',
            code_challenge: getCodeChallenge(),
            code_challenge_method: 'S256'
        },
    },
    token: {
        getHttp: (code) => {
            return {
                url: config.tokenUrl,
                data: {
                    code: code,
                    grant_type: 'authorization_code',
                    client_id: config.clientId,
                    redirect_uri: config.redirectUrl,
                    code_verifier: getCodeVerifier(),
                },
                config: {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${getEncodedAuthToken()}`
                    },
                }
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
                        'user.fields': 'profile_image_url'
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${accessToken}`
                    },
                }
            }
        },
        getUser: (data) => {
            return {
                name: data.data.name,
                email: '',
                picture: data.data.profile_image_url,
                authorization: {
                    source: 'twitter',
                    sourceId: data.data.id,
                }
            };
        }
    },
    refresh: {
        getHttp: (refreshToken) => {
            return {
                url: config.refreshUrl,
                data: {
                    refresh_token: refreshToken,
                    grant_type: 'refresh_token',
                },
                config: {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${getEncodedAuthToken()}`
                    },
                },
            };
        },
        getTokens: (data, refreshToken) => {
            return {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
            };
        }
    },
};

module.exports = (logger, errors) => require('./CommonStrategy')(logger, errors, strategy);
