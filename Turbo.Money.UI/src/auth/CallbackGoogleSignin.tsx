import React, { useEffect, useRef, useContext } from 'react'
import { redirect, useNavigate } from 'react-router-dom';

import AppContext from "../AppContext";

import http from "../axios/AxiosCommon";

const CallbackGoogleSignIn = () => {
    const called = useRef(false);
    const { signedIn, checkSignInState } = useContext(AppContext);
    const navigate = useNavigate();

    console.log("CallbackGoogleSignIn:");

    useEffect(() => {
        (async () => {
            console.log(`CallbackGoogleSignIn.useEffect: signedIn = ${signedIn}, called = ${called.current}`);
            if (!signedIn) {
                try {
                    // prevent rerender caused by StrictMode
                    if (called.current)
                        return;

                    //  window.location.search is the query part (?...) of the url sent by google.
                    //  we're passing it through to get(api/auth/sign_in).
                    console.log(`CallbackGoogleSignIn.useEffect: window.location.search = "${window.location.search}"`);

                    called.current = true;
                    const res = await http.post(`auth/sign_in${window.location.search}`);
                    console.log('response: ', res);

                    checkSignInState();
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

export default CallbackGoogleSignIn;