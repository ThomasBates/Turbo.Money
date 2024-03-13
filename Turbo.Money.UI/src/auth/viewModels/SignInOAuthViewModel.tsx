import React from 'react'

export default function SignInOAuthViewModel(dataProvider, source, mode) {

    const signIn = async () => {
        const data = await dataProvider.getSignInUrl(source, mode);

        if (data.error)
            console.error(data.error);
        else
            // Navigate to consent screen
            window.location.assign(data.url);
    }

    return {
        signIn,
    }
}
