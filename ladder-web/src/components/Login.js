import React, { useState } from "react";
import styled from "styled-components";
import CreateUserMutation from "../mutations/CreateUserMutation";
import LoginUserMutation from "../mutations/LoginUserMutation";

const log = (id, token) => console.log(id, token);
const _submitCreateUser = (name, email, password) => {
    CreateUserMutation(name, email, password, log);
};
const _submitLoginUser = (email, password) => {
    LoginUserMutation(email, password, log);
};

const StyledInput = styled.input`
    width: 250px;
    padding: 10px 10px;
    font-size: 1rem;
    background-color: var(--button-background);
    border: none;
    box-shadow: 0 0 5px 0 var(--border-hightlight);
    margin: 10px;
    border-radius: 5px;
    color: white;
    &::placeholder {
        color: var(--input-highlight);
    }
    &:-webkit-autofill {
        background: red;
    }
`;
const UserLogin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <React.Fragment>
            <StyledInput
                type="text"
                value={email}
                placeholder="Email"
                name="username"
                onChange={e => setEmail(e.target.value)}
            />
            <StyledInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={() => _submitLoginUser(email, password)}>
                Login
            </button>
        </React.Fragment>
    );
};

const CreateUser = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <React.Fragment>
            <StyledInput
                value={name}
                placeholder="Displayname"
                type="text"
                name="displayname"
                onChange={e => setName(e.target.value)}
            />
            <StyledInput
                value={email}
                type="email"
                placeholder="Email"
                name="username"
                onChange={e => setEmail(e.target.value)}
            />
            <StyledInput
                value={password}
                placeholder="Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={() => _submitCreateUser(name, email, password)}>
                CreateUser
            </button>
        </React.Fragment>
    );
};
const Login = () => {
    const [login, setLogin] = useState(true);
    return (
        <React.Fragment>
            {login ? (
                <React.Fragment>
                    <UserLogin />
                    <button onClick={() => setLogin(false)}>New user</button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <CreateUser />
                    <button onClick={() => setLogin(true)}>Have user</button>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Login;
