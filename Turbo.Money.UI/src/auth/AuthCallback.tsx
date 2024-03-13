import React, { useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import AppContext from "../AppContext";
import AuthDataProvider from "./data/AuthDataProvider";

const AuthCallback = () => {
    const called = useRef(false);
    const { signedIn, checkSignInState } = useContext(AppContext);
    const navigate = useNavigate();

    const authDataProvider = AuthDataProvider();

    console.log("AuthCallback:");

    useEffect(() => {
        (async () => {
            console.log(`AuthCallback.useEffect: signedIn = ${signedIn}, called = ${called.current}`);
            if (!signedIn) {
                try {
                    // prevent rerender caused by StrictMode
                    if (called.current)
                        return;

                    //  window.location.search is the query part (?...) 
                    //  of the url sent by x / google / facebook / etc.
                    //  we're passing it through to get(api/auth/sign_up).
                    console.log(`AuthCallback.useEffect: window.location.search = "${window.location.search}"`);

                    called.current = true;

                    const data = await authDataProvider.signIn(window.location.search);
                    console.log('AuthCallback.useEffect: data =', data);

                    checkSignInState(data);
                    navigate('/');
                } catch (err) {
                    console.error(err);
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        })();
    }, [checkSignInState, signedIn, navigate]);

    return <></>
};

export default AuthCallback;