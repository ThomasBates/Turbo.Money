import { useState, useContext } from 'react';

import AppContext from "app/AppContext";

export default function SignUpEmailViewModel() {
    const { users } = useContext(AppContext);

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
