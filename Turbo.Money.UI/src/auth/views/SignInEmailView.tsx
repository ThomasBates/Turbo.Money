import React from 'react';
import './Auth.css';

export default function SignInEmailView({ viewModel }) {
    return (
        <div className="login-wrapper">
            <h1>Please Sign In</h1>
            <form onSubmit={viewModel.submit}>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={e => viewModel.setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => viewModel.setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}