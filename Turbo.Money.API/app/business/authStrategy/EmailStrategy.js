
const config = {
    cookieSecret: process.env.COOKIE_SECRET,
}

const strategy = {
    auth: {
        url: 'not needed',
        params: { not: 'needed' },
    }
};

function EmailStrategy(logger) {

    const jwt = require("jsonwebtoken");

    const CommonStrategy = require('./CommonStrategy')(logger, strategy);

    function getSignInUrl() {
        return CommonStrategy.getSignInUrl();
    }

    async function getAccessToken(params) {
        try {
            logger.verbose('User', 'EmailStrategy.getAccessToken: params =', params);

            const userData = {
                name: params.name,
                email: params.email,
                picture: '',
                authorization: {
                    source: 'email',
                    sourceId: params.email,
                }
            }

            logger.verbose('User', 'EmailStrategy.getAccessToken: userData =', userData);

            const userToken = jwt.sign(userData, config.cookieSecret);

            logger.verbose('User', 'EmailStrategy.getAccessToken: userToken =', userToken);

            const tokens = {
                accessToken: userToken,
                refreshToken: userToken,
            };

            logger.verbose('User', 'EmailStrategy.getAccessToken: tokens =', tokens);

            return tokens;

        } catch (error) {
            logger.error('User', 'EmailStrategy.getAccessToken: error =', error.message || error);
            return { error: error.message || error };
        }
    }

    async function getUserData(accessToken) {
        try {
            const user = jwt.verify(accessToken, config.cookieSecret);

            logger.verbose('User', 'EmailStrategy.getUserData: user =', user);

            return user;

        } catch (error) {
            logger.error('User', 'EmailStrategy.getUserData: error =', error.message || error);
            return { error: error.message || error };
        }
    }

    async function refreshAccessToken(refreshToken) {
        const tokens = {
            accessToken: refreshToken,
            refreshToken: refreshToken,
        };

        logger.verbose('User', 'EmailStrategy.refreshAccessToken: tokens =', tokens);

        return tokens;
    }

    return {
        getSignInUrl,
        getAccessToken,
        getUserData,
        refreshAccessToken,
    }
}

module.exports = EmailStrategy;
