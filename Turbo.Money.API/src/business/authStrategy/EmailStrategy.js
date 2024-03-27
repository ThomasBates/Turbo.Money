
const config = {
    cookieSecret: process.env.COOKIE_SECRET,
}

const strategy = {
    auth: {
        url: 'not needed',
        params: { not: 'needed' },
    }
};

module.exports = function EmailStrategy(logger, errors) {
    const module = 'EmailStrategy';
    const category = 'User';

    const jwt = require("jsonwebtoken");

    const CommonStrategy = require('./CommonStrategy')(logger, strategy);

    function getSignInUrl() {
        return CommonStrategy.getSignInUrl();
    }

    async function getAccessToken(params) {
        const context = `${module}.getAccessToken`;
        try {
            logger.verbose(category, context, 'params =', params);

            const userData = {
                name: params.name,
                email: params.email,
                picture: '',
                authorization: {
                    source: 'email',
                    sourceId: params.email,
                }
            }

            logger.verbose(category, context, 'userData =', userData);

            const userToken = jwt.sign(userData, config.cookieSecret);

            logger.verbose(category, context, 'userToken =', userToken);

            const tokens = {
                accessToken: userToken,
                refreshToken: userToken,
            };

            logger.verbose(category, context, 'tokens =', tokens);

            return tokens;

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    }

    async function getUserData(accessToken) {
        const context = `${module}.getUserData`;
        try {
            const user = jwt.verify(accessToken, config.cookieSecret);

            logger.verbose(category, context, 'user =', user);

            return user;

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    }

    async function refreshAccessToken(refreshToken) {
        const context = `${module}.refreshAccessToken`;
        const tokens = {
            accessToken: refreshToken,
            refreshToken: refreshToken,
        };

        logger.verbose(category, context, 'tokens =', tokens);

        return tokens;
    }

    return {
        getSignInUrl,
        getAccessToken,
        getUserData,
        refreshAccessToken,
    }
}
