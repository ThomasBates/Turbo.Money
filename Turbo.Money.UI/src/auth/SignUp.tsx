import React from 'react'

import axios from "../axios/AxiosCommon";

const SignUp = () => {
    const handleOAuth2SignUp = async (source) => {
        try {
            // Gets authentication url from backend server
            const { data: { url } } = await axios.get(`auth/sign_in_url`, {
                params: {
                    source: source,
                    mode: 'signUp'
                }
            });
            console.log(`SignUp.handleSignUp('${source}'): url =`, url);

            // Navigate to consent screen
            window.location.assign(url);
        } catch (err) {
            console.error(err);
        }
    }

    const handleEmailSignUp = async () => { }

    return (
        <div className="tb-sign-up">
            <h3>Sign up for <strong>It's My Money</strong></h3>
            <button
                className="tb-button bi-twitter-x"
                onClick={()=>handleOAuth2SignUp('twitter')}
            >
                {' '}Sign up with Twitter
            </button>
            <br />
            <button
                className="tb-button bi-google"
                onClick={() => handleOAuth2SignUp('google')}
            >
                {' '}Sign up with Google
            </button>
            <br />
            <button
                className="tb-button bi-facebook"
                onClick={() => handleOAuth2SignUp('facebook')}
            >
                {' '}Sign up with Facebook
            </button>
            <br />
            <button
                className="tb-button bi-envelope-at-fill"
                onClick={handleEmailSignUp}
            >
                {' '}Sign up with Email
            </button>
        </div>
    );
}

export default SignUp;