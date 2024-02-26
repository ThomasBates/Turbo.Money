import React, { useContext } from 'react'

import http from "../axios/AxiosCommon";

const SignUp = () => {
    const handleTwitterSignUp = async () => { }

    const handleGoogleSignUp = async () => {
        try {
            // Gets authentication url from backend server
            const { data: { url } } = await http.get(`auth/sign_in_url`, {
                params: {
                    source: 'google',
                    mode: 'signUp'
                }
            });
            console.log(`SignUp.handleGoogleSignUp: url =`, url);

            // Navigate to consent screen
            window.location.assign(url);
        } catch (err) {
            console.error(err);
        }
    }

    const handleFacebookSignUp = async () => { }

    const handleEmailSignUp = async () => { }

    return (
        <div className="tb-sign-up">
            <h3>Sign up for <strong>It's My Money</strong></h3>
            <button
                className="tb-button bi-google"
                onClick={handleGoogleSignUp}
            >
                Sign up with Google
            </button>
            <br />
            <button
                className="tb-button bi-twitter-x"
                onClick={handleTwitterSignUp}
            >
                Sign up with Twitter
            </button>
            <br />
            <button
                className="tb-button bi-facebook"
                onClick={handleFacebookSignUp}
            >
                Sign up with Facebook
            </button>
            <br />
            <button
                className="tb-button bi-email"
                onClick={handleEmailSignUp}
            >
                Sign in with Email
            </button>
        </div>
    );
}

export default SignUp;