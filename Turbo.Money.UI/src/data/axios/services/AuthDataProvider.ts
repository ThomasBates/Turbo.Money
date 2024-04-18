
import axios from "data/axios/AxiosCommon";

import IAuthDataProvider, { ISignInUrlResult, ISignInResult } from 'data/interfaces/services/IAuthDataProvider';

import ILoggerService from 'services/logger/ILoggerService';
import IErrorService, { IErrorInfo } from 'services/errors/IErrorService';

export default function AuthDataProvider(logger: ILoggerService, errors: IErrorService): IAuthDataProvider {
    const module = AuthDataProvider.name;
    const category = 'User';

    // Gets 3rd party authentication url from backend server
    const getSignInUrl = async (source: string, mode: string): Promise<ISignInUrlResult | IErrorInfo> => {
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
            return errors.handleCatch(ex, context);
        }
    }

    // Gets whether user is already signed in using browser cookie
    const getSignedIn = async (): Promise<ISignInResult | IErrorInfo> => {
        const context = `${module}.${getSignedIn.name}`;
        logger.debug(category, context, '()');

        try {
            const response = await axios.get(`user/signed_in`);
            logger.debug(category, context, 'return', response.data);
            return response.data;
        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    }

    // Sends code from 3rd party authorization to backend server
    const signIn = async (params: string | object): Promise<ISignInResult | IErrorInfo> => {
        const context = `${module}.${signIn.name}`;
        logger.debug(category, context, 'params =', params);

        try {
            const response = (typeof params === 'string')
                ? await axios.post(`user/sign_in${params}`)
                : await axios.post('user/sign_in', {}, { params: params });
            logger.debug(category, context, 'return', response.data);
            return response.data;
        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    }

    // clears browser cookie
    const signOut = async (): Promise<ISignInResult | IErrorInfo> => {
        const context = `${module}.${signOut.name}`;
        logger.debug(category, context, '()');

        try {
            const response = await axios.post(`user/sign_out`);
            logger.debug(category, context, 'return', response.data);
            return response.data;
        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    }

    // aborts in case auth process is stuck "In Progress".
    const abort = async (): Promise<ISignInResult | IErrorInfo> => {
        const context = `${module}.${abort.name}`;
        logger.debug(category, context, '()');

        try {
            const response = await axios.post(`user/abort`);
            logger.debug(category, context, 'return', response.data);
            return response.data;
        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    }

    // aborts in case auth process is stuck "In Progress".
    const switchFamily = async (familyName: string): Promise<ISignInResult | IErrorInfo> => {
        const context = `${module}.${switchFamily.name}`;
        logger.debug(category, context, `('${familyName}')`);

        try {
            const response = await axios.get(`user/switch_family`, {
                params: {
                    familyName: familyName,
                }
            });
            logger.debug(category, context, 'return', response.data);
            return response.data;
        } catch (ex) {
            return errors.handleCatch(ex, context);
        }
    }

    return {
        getSignInUrl,
        getSignedIn,
        signIn,
        signOut,
        abort,
        switchFamily,
    };
}
