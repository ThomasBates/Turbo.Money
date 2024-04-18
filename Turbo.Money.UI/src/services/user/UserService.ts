import { useState, useEffect, useCallback } from "react";

import IAuthDataProvider, { ISignInUrlResult, ISignInResult } from 'data/interfaces/services/IAuthDataProvider';

import IUserInfo from 'models/user/IUserInfo';

import IErrorService, { IErrorInfo } from 'services/errors/IErrorService';
import ILoggerService from 'services/logger/ILoggerService';

import IUserService, { SignInStatus } from './IUserService';

export default function UserService(
    logger: ILoggerService,
    errors: IErrorService,
    authDataProvider: IAuthDataProvider): IUserService {
    const module = UserService.name;
    const category = 'User';

    const [user, setUser] = useState<IUserInfo|null>(null);
    const [signInStatus, setSignInStatus] = useState<SignInStatus>(SignInStatus.Pending);

    const checkSignInState = useCallback(async (data: ISignInResult | IErrorInfo | null): Promise<void> => {
        const context = `${module}.checkSignInState`;
        logger.debug(category, context, 'data =', data);
        try {
            if (!data) {
                data = await authDataProvider.getSignedIn();
                logger.debug(category, context, 'data =', data);
            }

            if (!data || errors.isError(data))
                return;

            data = data as ISignInResult;

            if (data.message === "In Progress") {
                return;
            }

            setSignInStatus(data.signedIn ? SignInStatus.SignedIn : SignInStatus.SignedOut);

            data.user && setUser(data.user);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }, [authDataProvider, errors, logger, module]);

    useEffect(() => {
        checkSignInState(null);
    }, []);

    const internalSignInOAuth = async (source: string, mode: string): Promise<void> => {
        const context = `${module}.${internalSignInOAuth.name}`;
        try {
            let data = await authDataProvider.getSignInUrl(source, mode);
            logger.debug(category, context, 'data =', data);

            if (!data || errors.isError(data))
                return;

            data = data as ISignInUrlResult;

            // Navigate to consent screen
            window.location.assign(data.url);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    const signUpOAuth = async (source: string): Promise<void> => {
        await internalSignInOAuth(source, 'signUp');
    }

    const signInOAuth = async (source: string): Promise<void> => {
        await internalSignInOAuth(source, 'signIn');
    }

    const callbackOAuth = async (params: string): Promise<void> => {
        const context = `${module}.${callbackOAuth.name}`;
        logger.debug(category, context, 'params =', params);
        try {
            const data = await authDataProvider.signIn(params);
            logger.debug(category, context, 'data =', data);

            // Check sign-in state again
            checkSignInState(data);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    const internalSignInEmail = async (mode: string, params: object) => {
        const context = `${module}.${internalSignInEmail.name}`;

        logger.debug(category, context, 'mode =', mode);
        logger.debug(category, context, 'params =', params);

        try {
            // We only need to do this step to initialize the process on the back-end. 
            // We can ignore the result.
            await authDataProvider.getSignInUrl('email', mode);

            const signInData = await authDataProvider.signIn(params);
            logger.debug(category, context, 'signInData =', signInData);

            checkSignInState(signInData);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    const signUpEmail = async (name: string, email: string, password: string): Promise<void> => {
        await internalSignInEmail('signUp', { name, email, password });
    }

    const signInEmail = async (email: string, password: string): Promise<void> => {
        await internalSignInEmail('signIn', { email, password });
    }

    const signOut = async (): Promise<void> => {
        const context = `${module}.${signOut.name}`;
        try {
            const data = await authDataProvider.signOut();
            logger.debug(category, context, 'data =', data);

            // Check sign-in state again
            checkSignInState(data);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    const switchFamily = async (familyName: string): Promise<void> => {
        const context = `${module}.${switchFamily.name}`;
        try {
            const data = await authDataProvider.switchFamily(familyName);
            logger.debug(category, context, 'data =', data);

            // Check sign-in state again
            checkSignInState(data);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    const abort = async (): Promise<void> => {
        const context = `${module}.${abort.name}`;
        try {
            const data = await authDataProvider.abort();
            logger.debug(category, context, 'data =', data);

            // Check sign-in state again
            checkSignInState(data);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    return {
        user,
        signInStatus,

        switchFamily,

        auth: {
            signUpOAuth,
            signInOAuth,
            callbackOAuth,

            signUpEmail,
            signInEmail,

            signOut,
            abort,
        }
    };
}
