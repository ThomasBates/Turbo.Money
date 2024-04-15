import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { useAppContext } from 'app/AppContextAccess';

import ISignInEmailViewModel from './ISignInEmailViewModel';

export default function SignInEmailViewModel(): ISignInEmailViewModel {
    const { users } = useAppContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email: string) => {
        return !!email;
    }

    const canSubmit = () => {
        if (!email || !password)
            return false;

        if (!isValidEmail(email))
            return false;

        return true;
    }

    const submit = async (navigate: NavigateFunction) => {
        if (!canSubmit())
            return;

        await users.auth.signInEmail(email, password);
        navigate('/');
    }

    return {
        email,
        password,

        setEmail,
        setPassword,

        canSubmit: canSubmit(),
        submit,
    }
}
