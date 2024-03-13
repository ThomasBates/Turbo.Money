import React, { useEffect, useState, useCallback } from 'react'

import AppContext from "./AppContext";
import AuthDataProvider from "./auth/data/AuthDataProvider";

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);

    const authDataProvider = AuthDataProvider();

    const checkSignInState = useCallback(async (data) => {
        try {
            console.log('AppContextProvider.checkSignInState: data =', data);
            if (!data) {
                data = await authDataProvider.getSignedIn();
                console.log('AppContextProvider.checkSignInState: data =', data);
            }

            if (data.message === "In Progress") {
                return;
            }

            setSignedIn(data.signedIn);
            data.user && setUser(data.user);
        } catch (error) {
            console.error('AppContextProvider.checkSignInState: catch: error =', error);
        }
    }, []);

    useEffect(() => {
        checkSignInState(null);
    }, []);

    return (
        <AppContext.Provider value={{ user, signedIn, checkSignInState }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;