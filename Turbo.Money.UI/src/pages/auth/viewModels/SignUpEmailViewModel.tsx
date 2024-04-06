import { useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

export default function SignUpEmailViewModel() {
    const { users } = useAppContext();

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

        canSubmit,
        submit,
    }
}
