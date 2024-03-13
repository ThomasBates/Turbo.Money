import React, { useState } from 'react';

export default function SignUpEmailViewModel() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const canSubmit = () => {

    }

    const submit = () => {

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
