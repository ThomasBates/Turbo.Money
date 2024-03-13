import React, { useEffect } from 'react'


export default function SignInOAuthView({ viewModel }) {

    useEffect(() => {
        viewModel.signIn();
    }, []);

    return (
        <></>
    );
}
