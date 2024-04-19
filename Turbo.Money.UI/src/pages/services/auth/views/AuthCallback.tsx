import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAppContext } from 'app/AppContextAccess';

import { SignInStatus } from 'services/user/IUserService';

export default function AuthCallback() {
    const module = AuthCallback.name;
    const category = 'User';

    const called = useRef(false);
    const { logger, users } = useAppContext();
    const navigate = useNavigate();

    logger.debug(category, module, ':');

    useEffect(() => {
        const context = `${module}.${useEffect.name}`;
        (async () => {
            logger.debug(category, context, `signInStatus = ${users.signInStatus}, called = ${called.current}`);
            if (users.signInStatus != SignInStatus.SignedIn) {
                try {
                    // prevent rerender caused by StrictMode
                    if (called.current)
                        return;

                    called.current = true;

                    //  window.location.search is the query part (?...) 
                    //  of the url sent by x / google / facebook / etc.
                    //  we're passing it through to get(api/auth/sign_up).
                    logger.debug(category, context, `window.location.search = "${window.location.search}"`);

                    await users.auth.callbackOAuth(window.location.search);
                    navigate('/');
                } catch (ex) {
                    logger.error(category, context, 'ex =', ex);
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        })();
    }, []);

    return <></>
}