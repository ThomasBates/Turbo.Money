import React, { useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import AppContext from "../AppContext";

export default function AuthCallback() {
    const module = AuthCallback.name;

    const called = useRef(false);
    const { users } = useContext(AppContext);
    const navigate = useNavigate();

    console.log(module,':');

    useEffect(() => {
        const context = `${module}.${useEffect.name}:`;
        (async () => {
            console.log(context, `signedIn = ${users.signedIn}, called = ${called.current}`);
            if (!users.signedIn) {
                try {
                    // prevent rerender caused by StrictMode
                    if (called.current)
                        return;

                    called.current = true;

                    //  window.location.search is the query part (?...) 
                    //  of the url sent by x / google / facebook / etc.
                    //  we're passing it through to get(api/auth/sign_up).
                    console.log(context, `window.location.search = "${window.location.search}"`);

                    await users.auth.callbackOAuth(window.location.search);
                    navigate('/');
                } catch (err) {
                    console.error(err);
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        })();
    }, []);

    return <></>
};
