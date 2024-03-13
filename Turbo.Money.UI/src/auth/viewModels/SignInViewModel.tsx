import React from 'react'

export default function SignInViewModel(dataProvider, mode) {

    const authSources = ['twitter', 'google', 'facebook', 'email'];

    const authType = {
        'twitter': 'oauth2',
        'google': 'oauth2',
        'facebook': 'oauth2',
        'email': 'email'
    };

    const signInWithOAuth2 = async (source) => {
        const data = await dataProvider.getSignInUrl(source, mode);

        if (data.error)
            console.error(data.error);
        else
            // Navigate to consent screen
            window.location.assign(data.url);
    }

    const signInWithEmail = async (navigate) => {
        navigate(`/${mode}Email`);
    }

    const signIn = async (navigate,source) => {
        switch (authType[source]) {
            case 'oauth2':
                await signInWithOAuth2(source);
                break;
            case 'email':
                await signInWithEmail(navigate);
                break;
        }
    }

    return {
        authSources,
        signIn,
    }
}
