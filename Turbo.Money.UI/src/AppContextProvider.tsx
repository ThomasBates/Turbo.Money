import React, { useEffect, useState, useCallback } from 'react'

import AppContext from "./AppContext";
import http from "./axios/AxiosCommon";

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);

    const checkSignInState = useCallback(async () => {
        try {

            const { data: { signedIn, message, user } } = await http.get(`auth/signed_in`);

            console.log('AppContextProvider.checkSignInState: signedIn =', signedIn);
            message &&
                console.log('AppContextProvider.checkSignInState: message =', message);
            user &&
                console.log('AppContextProvider.checkSignInState: user =', user);

            setSignedIn(signedIn);
            user && setUser(user);
        } catch (error) {
            console.error('AppContextProvider.checkSignInState: catch: error =', error);
        }
    }, []);

    useEffect(() => {
        checkSignInState();
    }, [checkSignInState]);

    return (
        <AppContext.Provider value={{ user, signedIn, checkSignInState }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;