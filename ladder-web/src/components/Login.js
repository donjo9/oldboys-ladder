import React, { useState } from "react";
import CreateUserMutation from "../mutations/CreateUserMutation";
import LoginUserMutation from "../mutations/LoginUserMutation";

const log = (id, token) => console.log(id, token);
const _submitCreateUser = (name, email, password) => {
    CreateUserMutation(name, email, password, log);
};
const _submitLoginUser = (email, password) => {
    LoginUserMutation(email, password, log);
};

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={() => _submitLoginUser(email, password)}>
                Login
            </button>
            <button onClick={() => _submitCreateUser(name, email, password)}>
                CreateUser
            </button>
        </div>
    );
};

export default Login;
