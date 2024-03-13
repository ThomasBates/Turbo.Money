import React, { useState, useContext } from 'react';

import AppContext from "../../AppContext";

export default function SignUpEmailViewModel(authDataProvider) {
    const { signedIn, checkSignInState } = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email) => {
        return !!email;
    }

    const canSubmit = () => {
        if (!name || !email || !password)
            return false;

        if (!isValidEmail(email))
            return false;

        return true;
    }

    const submit = async (navigate) => {
        if (!canSubmit())
            return;

        try {
            const urlData = await authDataProvider.getSignInUrl('email', 'signUp');
            console.log('SignUpEmailViewModel.submit: urlData =', urlData);

            //const params = { source: 'email', mode: 'signUp', name, email, password };
            const params = { name, email, password };
            console.log('SignUpEmailViewModel.submit: params =', params);

            const signInData = await authDataProvider.signIn(params);
            console.log('SignUpEmailViewModel.submit: signInData =', signInData);

            checkSignInState(signInData);
            navigate('/');

        } catch (error) {
            console.log('SignUpEmailViewModel.submit: error =', error);
            navigate('/');
        }
    }

    return {
        name,
        email,
        password,

        setName,
        setEmail,
        setPassword,

        canSubmit,
        submit,
    }
}
