import React from 'react'

import axios from "../axios/AxiosCommon";

const SignIn = () => {
    const handleOAuth2SignIn = async (source) => {
        try {
            // Gets authentication url from backend server
            const { data: { url } } = await axios.get(`auth/sign_in_url`, {
                params: {
                    source: source,
                    mode: 'signIn'
                }
            });
            console.log(`SignIn.handleSignIn('${source}'): url =`, url);

            // Navigate to consent screen
            window.location.assign(url);
        } catch (err) {
            console.error(err);
        }
    }

    const handleEmailSignIn = async () => { }

    return (
        <div className="tb-sign-in">
            <h3>Sign in to <strong>It's My Money</strong></h3>
            <button
                className="tb-button bi-twitter-x"
                onClick={() => handleOAuth2SignIn('twitter')}
            >
                {' '}Sign in with Twitter
            </button>
            <br />
            <button
                className="tb-button bi-google"
                onClick={() => handleOAuth2SignIn('google')}
            >
                {' '}Sign in with Google
            </button>
            <br />
            <button
                className="tb-button bi-facebook"
                onClick={() => handleOAuth2SignIn('facebook')}
            >
                {' '}Sign in with Facebook
            </button>
            <br />
            <button
                className="tb-button bi-envelope-at-fill"
                onClick={handleEmailSignIn}
            >
                {' '}Sign in with Email
            </button>
        </div>
    );
}

export default SignIn;