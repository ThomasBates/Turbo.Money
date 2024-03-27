
module.exports = function CommonStrategy(logger, strategy) {
    const module = 'CommonStrategy';
    const category = 'User';

    const axios = require("axios");
    const queryString = require('node:querystring');

    function getSignInUrl() {
        const context = `${module}.getSignInUrl`;
        const { url, params } = strategy.auth;

        logger.verbose(category, context, 'url =', url);
        logger.verbose(category, context, 'params =', params);

        const signInUrl = `${url}?${queryString.stringify(params)}`;

        logger.debug(category, context, 'return', signInUrl);

        return signInUrl;
    }

    async function getAccessToken(params) {
        const context = `${module}.getAccessToken`;
        try {
            if (!('code' in params)) {
                const error = 'Authorization code must be provided';
                logger.error(category, context, 'error =', error);
                return { error };
            }

            const http = strategy.token.getHttp(params.code);

            logger.verbose(category, context, 'http =', http);

            const { data } = await axios.post(http.url, http.data, http.config);

            logger.verbose(category, context, 'data =', data);

            const tokens = strategy.token.getTokens(data);

            logger.verbose(category, context, 'tokens =', tokens);

            return tokens;

        } catch (error) {
            logger.error(category, context, 'error =', error.message || error);
            return { error: error.message || error };
        }
    }

    async function getUserData(accessToken) {
        const context = `${module}.getUserData`;
        try {
            const http = strategy.user.getHttp(accessToken);

            logger.verbose(category, context, 'http =', http);

            const { data } = await axios.get(http.url, http.config);

            logger.verbose(category, context, 'data =', data);

            const user = strategy.user.getUser(data);

            logger.verbose(category, context, 'user =', user);

            return user;

        } catch (error) {
            logger.error(category, context, 'error =', error.message || error);
            return { error: error.message || error };
        }
    }

    async function refreshAccessToken(refreshToken) {
        const context = `${module}.refreshAccessToken`;
        try {
            const http = strategy.refresh.getHttp(refreshToken);

            logger.verbose(category, context, 'http =', http);

            const { data } = await axios.post(http.url, http.data, http.config);

            logger.verbose(category, context, 'data =', data);

            const tokens = strategy.refresh.getTokens(data, refreshToken);

            logger.verbose(category, context, 'tokens =', tokens);

            return tokens;

        } catch (error) {
            logger.error(category, context, 'error =', error.message || error);
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
