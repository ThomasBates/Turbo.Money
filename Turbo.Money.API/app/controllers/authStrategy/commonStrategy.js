
const CommonStrategy = (logger, strategy) => {

    const axios = require("axios");
    const queryString = require('node:querystring');

    function getSignInUrl() {
        const { url, params } = strategy.auth;

        logger.verbose('User', 'CommonStrategy.getSignInUrl: url =', url);
        logger.verbose('User', 'CommonStrategy.getSignInUrl: params =', params);

        const signInUrl = `${url}?${queryString.stringify(params)}`;

        logger.debug('User', "CommonStrategy.getSignInUrl: return ", signInUrl);

        return signInUrl;
    }

    async function getAccessToken(params) {
        try {
            if (!('code' in params)) {
                const error = 'Authorization code must be provided';
                logger.error('User', 'CommonStrategy.getAccessToken: error =', error);
                return { error };
            }

            const http = strategy.token.getHttp(params.code);

            logger.verbose('User', 'CommonStrategy.getAccessToken: http =', http);

            const { data } = await axios.post(http.url, http.data, http.config);

            logger.verbose('User', 'CommonStrategy.getAccessToken: data =', data);

            const tokens = strategy.token.getTokens(data);

            logger.verbose('User', 'CommonStrategy.getAccessToken: tokens =', tokens);

            return tokens;

        } catch (error) {
            logger.error('User', 'CommonStrategy.getAccessToken: error =', error.message || error);
            return { error: error.message || error };
        }
    }

    async function getUserData(accessToken) {
        try {
            const http = strategy.user.getHttp(accessToken);

            logger.verbose('User', 'CommonStrategy.getUserData: http =', http);

            const { data } = await axios.get(http.url, http.config);

            logger.verbose('User', 'CommonStrategy.getUserData: data =', data);

            const user = strategy.user.getUser(data);

            logger.verbose('User', 'CommonStrategy.getUserData: user =', user);

            return user;

        } catch (error) {
            logger.error('User', 'CommonStrategy.getUserData: error =', error.message || error);
            return { error: error.message || error };
        }
    }

    async function refreshAccessToken(refreshToken) {
        try {
            const http = strategy.refresh.getHttp(refreshToken);

            logger.verbose('User', 'CommonStrategy.refreshAccessToken: http =', http);

            const { data } = await axios.post(http.url, http.data, http.config);

            logger.verbose('User', 'CommonStrategy.refreshAccessToken: data =', data);

            const tokens = strategy.refresh.getTokens(data, refreshToken);

            logger.verbose('User', 'CommonStrategy.refreshAccessToken: tokens =', tokens);

            return tokens;

        } catch (error) {
            logger.error('User', 'CommonStrategy.refreshAccessToken: error =', error.message || error);
            return { error: error.message || error };
        }
    }

    return {
        getSignInUrl,
        getAccessToken,
        getUserData,
        refreshAccessToken
    }
}

module.exports = CommonStrategy;

