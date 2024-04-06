import { useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

export default function SignInEmailViewModel() {
    const { users } = useAppContext();

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

        await users.auth.signInEmail(email, password);
        navigate('/');
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
