import React from 'react'

import http from "../axios/AxiosCommon";

const SignIn = () => {
    const handleTwitterSignIn = async () => { }

    const handleGoogleSignIn = async () => {
        try {
            // Gets authentication url from backend server
            const { data: { url } } = await http.get(`auth/sign_in_url`, {
                params: {
                    source: 'google',
                    mode: 'signIn'
                }
            });

            // Navigate to consent screen
            window.location.assign(url);
        } catch (err) {
            console.error(err);
        }
    }

    const handleFacebookSignIn = async () => { }

    const handleEmailSignIn = async () => { }

    return (
        <div className="tb-sign-in">
            <h3>Sign in to <strong>It's My Money</strong></h3>
            <button
                className="tb-button bi-google"
                onClick={handleGoogleSignIn}
            >
                Sign in with Google
            </button>
            <br />
            <button
                className="tb-button bi-twitter-x"
                onClick={handleTwitterSignIn}
            >
                Sign in with Twitter
            </button>
            <br />
            <button
                className="tb-button bi-facebook"
                onClick={handleFacebookSignIn}
            >
                Sign in with Facebook
            </button>
            <br />
            <button
                className="tb-button bi-email"
                onClick={handleEmailSignIn}
            >
                Sign in with Email
            </button>
        </div>
    );
}

export default SignIn;