import React, { useCallback, useState, useEffect } from "react";

import AuthDataProvider from "../../auth/data/AuthDataProvider";

export default function UserService() {
    const module = UserService.name;

    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);

    const authDataProvider = AuthDataProvider();

    useEffect(() => {
        checkSignInState(null);
    }, []);

    const checkSignInState = async (data) => {
        const context = `${module}.${checkSignInState.name}:`;
        try {
            console.log(context, 'data =', data);
            if (!data) {
                data = await authDataProvider.getSignedIn();
                console.log(context, 'data =', data);
            }

            if (data.message === "In Progress") {
                return;
            }

            setSignedIn(data.signedIn);
            data.user && setUser(data.user);
        } catch (error) {
            console.error(context, 'catch: error =', error);
        }
    }

    const internalSignInOAuth = async (source, mode) => {
        const context = `${module}.${internalSignInOAuth.name}:`;
        try {
            const data = await authDataProvider.getSignInUrl(source, mode);

            if (data.error)
                console.error(data.error);
            else
                // Navigate to consent screen
                window.location.assign(data.url);
        } catch (error) {
            console.error(context, 'catch: error =', error);
        }
    }

    const signUpOAuth = async (source) => {
        await internalSignInOAuth(source, 'signUp');
    }

    const signInOAuth = async (source) => {
        await internalSignInOAuth(source, 'signIn');
    }

    const callbackOAuth = async (params) => {
        const context = `${module}.${callbackOAuth.name}:`;
        console.log(context, 'params =', params);

        const data = await authDataProvider.signIn(params);
        console.log(context, 'data =', data);

        // Check sign-in state again
        checkSignInState(data);
    }

    const internalSignInEmail = async (mode, params) => {
        const context = `${module}.${internalSignInEmail.name}:`;

        console.log(context, 'mode =', mode);
        console.log(context, 'params =', params);

        // We only need to do this step to initialize the process on the back-end. 
        // We can ignore the result.
        await authDataProvider.getSignInUrl('email', mode);

        const signInData = await authDataProvider.signIn(params);
        console.log(context, 'signInData =', signInData);

        checkSignInState(signInData);
    }

    const signUpEmail = async (name, email, password) => {
        await internalSignInEmail('signUp', { name, email, password });
    }

    const signInEmail = async (email, password) => {
        await internalSignInEmail('signIn', { email, password });
    }

    const signOut = async () => {
        const context = `${module}.${signOut.name}:`;
        try {
            const data = await authDataProvider.signOut();
            console.log(context, 'data =', data);

            // Check sign-in state again
            checkSignInState(data);
        } catch (error) {
            console.error(context, 'catch: error =', error);
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
