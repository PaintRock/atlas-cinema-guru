import React from 'react';
import Input from '../../components/general/Input';
import './auth.css';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Login({ username, password, setUsername, setPassword }) {
    return (
        <>
        <Input
            label="Username:"
            type="text"
            value={username}
            setValue={setUsername}
            className="auth-input"
            icon={faUser}

            />
        <Input
            icon={faKey}
            label="Password:"
            type="password"
            value={password}
            setValue={setPassword}
            className="auth-input"
            
            />
            </>
    );
}