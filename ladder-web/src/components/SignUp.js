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

const SignUp = props => {
    const [token, setToken] = usePersistedState(AUTHTOKEN, "");
    const [login, setLogin] = useState(true);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const _submitCreateUser = useCallback(
        (name, email, password) => {
            CreateUserMutation(
                name,
                email,
                password,
                (id, token) => {
                    log(id, token);
                    localStorage.setItem(AUTHTOKEN, token);
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
            <Error>{error}</Error>

            <Button
                onClick={() => {
                    _submitCreateUser(name, email, password);
                    props.history.push("/ladder");
                }}
            >
                Create user
            </Button>
        </LoginSignUpContainer>
    );
};

export default withRouter(SignUp);
