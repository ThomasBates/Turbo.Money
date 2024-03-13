import React from 'react'
import { useNavigate } from "react-router-dom";


const SignInView = ({ viewModel }) => {
    const navigate = useNavigate();

    const sourceName = {
        'twitter': 'X/Twitter',
        'google': 'Google',
        'facebook': 'Facebook',
        'email': 'Email'
    };
    const sourceIcon = {
        'twitter': 'bi-twitter-x',
        'google': 'bi-google',
        'facebook': 'bi-facebook',
        'email': 'bi-envelope-at-fill'
    };


    return (
        <div className="tb-sign-in">
            <h3>Sign in to <strong>It's My Money</strong></h3>

            {viewModel.authSources.map(source => (
                <button
                    className={"tb-button " + sourceIcon[source]}
                    onClick={() => viewModel.signIn(navigate, source)}
                >
                    {' '}Sign in with {sourceName[source]}
                </button>
            ))}

        </div>
    );
}

export default SignInView;