import React, { useState } from 'react';
import axios from 'axios';

function Reset() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://yourapi.com/user/reset-password', {
                email,
                password,
                password_confirmation: passwordConfirmation,
                security_answer: securityAnswer,
                two_factor_code: twoFactorCode
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                New Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <label>
                Confirm New Password:
                <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
            </label>
            <label>
                Security Answer:
                <input type="text" value={securityAnswer} onChange={e => setSecurityAnswer(e.target.value)} required />
            </label>
            <label>
                Two-Factor Code:
                <input type="text" value={twoFactorCode} onChange={e => setTwoFactorCode(e.target.value)} required />
            </label>
            <button type="submit">Reset Password</button>
            <div>{message}</div>
        </form>
    );
}

export default Reset;