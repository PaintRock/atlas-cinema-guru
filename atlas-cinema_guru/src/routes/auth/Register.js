import React from "react";
import Input from "../../components/general/Input"; 
import "./auth.css";

export default function Register({ username, password, setUsername, setPassword }) {
    return (
        <>
        <Input
            label="Username"
            type="text"
            value={username}
            setValue={setUsername}
            className="auth-input"
            />
            <Input
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
            className="auth-input"
            />
            </>
    );
}
