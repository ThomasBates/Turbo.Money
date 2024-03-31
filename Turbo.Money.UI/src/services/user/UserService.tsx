import React, { useCallback, useState, useEffect } from "react";

//import AuthDataProvider from "../../auth/data/AuthDataProvider";

export default function UserService(logger, errors, authDataProvider) {
    const module = UserService.name;
    const category = 'User';

    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);

    //const authDataProvider = AuthDataProvider();

    useEffect(() => {
        checkSignInState(null);
    }, []);

    const checkSignInState = async (data) => {
        const context = `${module}.${checkSignInState.name}`;
        logger.debug(category, context, 'data =', data);
        try {
            if (!data) {
                data = await authDataProvider.getSignedIn();
                logger.debug(category, context, 'data =', data);
            }

            if (data.message === "In Progress") {
                return;
            }

            setSignedIn(data.signedIn);
            data.user && setUser(data.user);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    const internalSignInOAuth = async (source, mode) => {
        const context = `${module}.${internalSignInOAuth.name}`;
        try {
            const data = await authDataProvider.getSignInUrl(source, mode);
            logger.debug(category, context, 'data =', data);

            if (!data.error)
                // Navigate to consent screen
                window.location.assign(data.url);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    }

    const signUpOAuth = async (source) => {
        await internalSignInOAuth(source, 'signUp');
    }

    const signInOAuth = async (source) => {
        await internalSignInOAuth(source, 'signIn');
    }

    const callbackOAuth = async (params) => {
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

    const internalSignInEmail = async (mode, params) => {
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

    const signUpEmail = async (name, email, password) => {
        await internalSignInEmail('signUp', { name, email, password });
    }

    const signInEmail = async (email, password) => {
        await internalSignInEmail('signIn', { email, password });
    }

    const signOut = async () => {
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

    return {
        user,
        signedIn,

        auth: {
            signUpOAuth,
            signInOAuth,
            callbackOAuth,

            signUpEmail,
            signInEmail,

            signOut,
        }
    };
}
