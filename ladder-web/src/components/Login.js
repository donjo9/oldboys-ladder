import React, { useState, useCallback, useContext } from "react";
import { withRouter } from "react-router-dom";
import LoginUserMutation from "../mutations/LoginUserMutation";
import { Button } from "./Button";
import { USERID } from "../constants";

import { LoginSignUpContainer, StyledInput, Error } from "./LoginSignupCommon";
import Modal from "./Modal";
import { LoginContext } from "./context";

const Login = props => {
    const tokenContext = useContext(LoginContext);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const _submitLoginUser = useCallback(
        (email, password) => {
            LoginUserMutation(
                email,
                password,
                (id, token) => {
                    tokenContext.dispatch({
                        type: "SAVE_TOKEN",
                        payload: token
                    });
                    localStorage.setItem(USERID, id);
                    props.history.push("/ladder");
                    props.dismiss();
                },
                err => {
                    setError(err.source.errors[0].message);
                }
            );
        },
        [props, tokenContext]
    );

    return (
        <Modal visable={props.show} dismiss={props.dismiss}>
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
                        _submitLoginUser(email, password);
                    }}
                >
                    Login
                </Button>
            </LoginSignUpContainer>
        </Modal>
    );
};

export default withRouter(Login);
