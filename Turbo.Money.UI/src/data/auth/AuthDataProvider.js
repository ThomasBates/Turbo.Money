import axios from "data/axios/AxiosCommon";

export default function AuthDataProvider(logger, errors) {
    const module = AuthDataProvider.name;
    const category = 'User';

    // Gets 3rd party authentication url from backend server
    const getSignInUrl = async (source, mode) => {
        const context = `${module}.${getSignInUrl.name}`;
        logger.debug(category, context, `('${source}', '${mode}')`);

        try {
            const response = await axios.get(`user/sign_in_url`, {
                params: {
                    source: source,
                    mode: mode,
                }
            });
            logger.debug(category, context, 'return', response.data);
            return response.data;

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    }

    // Gets whether user is already signed in using browser cookie
    const getSignedIn = async () => {
        const context = `${module}.${getSignedIn.name}`;
        logger.debug(category, context, '()');

        try {

            const response = await axios.get(`user/signed_in`);
            logger.debug(category, context, 'return', response.data);
            return response.data;

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    }

    // Sends code from 3rd party authorization to backend server
    const signIn = async (params) => {
        const context = `${module}.${signIn.name}`;
        logger.debug(category, context, 'params =', params);

        try {
            const response = (typeof params === 'string')
                ? await axios.post(`user/sign_in${params}`)
                : await axios.post('user/sign_in', {}, { params: params });
            logger.debug(category, context, 'return', response.data);
            return response.data;

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    }

    // clears browser cookie
    const signOut = async () => {
        const context = `${module}.${signOut.name}`;
        logger.debug(category, context, '()');

        try {

            const response = await axios.post(`user/sign_out`);
            logger.debug(category, context, 'return', response.data);
            return response.data;

        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    }

    return {
        getSignInUrl,
        getSignedIn,
        signIn,
        signOut,
    };
}
