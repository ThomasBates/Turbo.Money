import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { useAppContext } from 'app/AppContextAccess';

import ISignUpEmailViewModel from './ISignUpEmailViewModel';

export default function SignUpEmailViewModel(): ISignUpEmailViewModel {
    const { users } = useAppContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email: string) => {
        return !!email;
    }

    const canSubmit = () => {
        if (!name || !email || !password)
            return false;

        if (!isValidEmail(email))
            return false;

        return true;
    }

    const submit = async (navigate: NavigateFunction) => {
        if (!canSubmit())
            return;

        await users.auth.signUpEmail(name, email, password);
        navigate('/');
    }

    return {
        name,
        email,
        password,

        setName,
        setEmail,
        setPassword,

        canSubmit: canSubmit(),
        submit,
    }
}
