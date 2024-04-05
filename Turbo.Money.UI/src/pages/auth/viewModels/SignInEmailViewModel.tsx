import { useState, useContext } from 'react';

import AppContext from "app/AppContext";

export default function SignInEmailViewModel() {
    const { users } = useContext(AppContext);

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
