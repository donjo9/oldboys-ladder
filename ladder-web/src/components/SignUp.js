import React, { useState, useCallback, useContext } from "react";
import { withRouter } from "react-router-dom";

import CreateUserMutation from "../mutations/CreateUserMutation";

import { Button } from "./Button";
import {  USERID } from "../constants";
import { LoginSignUpContainer, StyledInput, Error } from "./LoginSignupCommon";
import { LoginContext } from "./context";

const SignUp = props => {
    const tokenContext = useContext(LoginContext);
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
                    tokenContext.dispatch({
                        type: "SAVE_TOKEN",
                        payload: token
                    });
                    localStorage.setItem(USERID, id);
                    props.history.push("/ladder");
                },
                err => {
                    setError(err.source.errors[0].message);
                }
            );
        },
        [props.history, tokenContext]
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
