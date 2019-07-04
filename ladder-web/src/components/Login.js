import React, { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import CreateUserMutation from "../mutations/CreateUserMutation";
import LoginUserMutation from "../mutations/LoginUserMutation";
import { ButtonBase, Button } from "./Button";
import { AUTHTOKEN, USERID } from "../constants";
import { usePersistedState } from "./Header";
import { LoginSignUpContainer, StyledInput, Error } from "./LoginSignupCommon";

const log = (id, token) => console.log(id, token);

const Login = props => {
    const [token, setToken] = usePersistedState(AUTHTOKEN, "");
    const [login, setLogin] = useState(true);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const _submitLoginUser = useCallback(
        (email, password) => {
            LoginUserMutation(
                email,
                password,
                (id, token) => {
                    log(id, token);
                    setToken(token);
                    localStorage.setItem(USERID, id);
                    props.history.push("/ladder");
                },
                err => {
                    setError(err.source.errors[0].message);
                }
            );
        },
        [props.history]
    );

    return (
        <LoginSignUpContainer>
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
            <Error>{error}</Error>
            <Button
                onClick={() => {
                    if (_submitLoginUser(email, password)) {
                        props.history.push("/ladder");
                    }
                }}
            >
                Login
            </Button>
        </LoginSignUpContainer>
    );
};

export default withRouter(Login);
