import React, { useState, useContext } from 'react';

import AppContext from "../../AppContext";

export default function SignInEmailViewModel(authDataProvider) {
    const { signedIn, checkSignInState } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email) => {
        return !!email;
    }

    const canSubmit = () => {
        if (!email || !password)
            return false;

        if (!isValidEmail(email))
            return false;

        return true;
    }

    const submit = async (navigate) => {
        if (!canSubmit())
            return;

        try {
            const urlData = await authDataProvider.getSignInUrl('email', 'signIn');
            console.log('SignInEmailViewModel.submit: urlData =', urlData);

            const params = { email, password };
            console.log('SignInEmailViewModel.submit: params =', params);

            const signInData = await authDataProvider.signIn(params);
            console.log('SignInEmailViewModel.submit: signInData =', signInData);

            checkSignInState(signInData);
            navigate('/');

        } catch (error) {
            console.log('SignInEmailViewModel.submit: error =', error);
            navigate('/');
        }
    }

    return {
        email,
        password,

        setEmail,
        setPassword,

        canSubmit,
        submit,
    }
}
