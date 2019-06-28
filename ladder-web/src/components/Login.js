import React, { useState } from "react";
import styled from "styled-components";
import CreateUserMutation from "../mutations/CreateUserMutation";
import LoginUserMutation from "../mutations/LoginUserMutation";
import { ButtonBase } from "./Button";

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
const ButtonContainer = styled.div`
    display: flex;
    justify-self: flex-end;
    margin-top: auto;
`;
const Button = styled.div`
    ${ButtonBase}
    font-size: 1rem;
    width: 150px;
    text-align: center;
`;

const LoginContainer = styled.div`
    width: 400px;
    height: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Login = () => {
    const [login, setLogin] = useState(true);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return (
        <LoginContainer>
            {login ? (
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
                    <ButtonContainer>
                        <Button
                            onClick={() => _submitLoginUser(email, password)}
                        >
                            Login
                        </Button>
                        <Button onClick={() => setLogin(false)}>
                            New user
                        </Button>
                    </ButtonContainer>
                </React.Fragment>
            ) : (
                <React.Fragment>
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
                    <StyledInput
                        value={name}
                        placeholder="Displayname"
                        type="text"
                        name="displayname"
                        onChange={e => setName(e.target.value)}
                    />
                    <ButtonContainer>
                        <Button
                            onClick={() =>
                                _submitCreateUser(name, email, password)
                            }
                        >
                            Create user
                        </Button>
                        <Button onClick={() => setLogin(true)}>
                            Have user
                        </Button>
                    </ButtonContainer>
                </React.Fragment>
            )}
        </LoginContainer>
    );
};

export default Login;
