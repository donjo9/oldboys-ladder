import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import LoginUserMutation from "../mutations/LoginUserMutation";
import { Button } from "./Button";

import { Formik } from "formik";

import { LoginSignUpContainer, Error, StyledField } from "./LoginSignupCommon";
import Modal from "./Modal";
import { LoginContext } from "./context";

const Login = props => {
    const { show, dismiss, history } = props;
    const tokenContext = useContext(LoginContext);
    return (
        <Modal visable={show} dismiss={dismiss}>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values, actions) => {
                    LoginUserMutation(
                        values.username,
                        values.password,
                        (id, token) => {
                            tokenContext.dispatch({
                                type: "SAVE_TOKEN",
                                payload: token
                            });
                            dismiss();
                            history.push("/ladder");
                        },
                        err => {
                            actions.setStatus({
                                msg: err.source.errors[0].message
                            });
                            actions.setSubmitting(false);
                        }
                    );
                }}
                render={({
                    values,
                    status,
                    errors,
                    touched,
                    isSubmitting,
                    handleSubmit,
                    handleChange
                }) => (
                    <LoginSignUpContainer
                        onSubmit={handleSubmit}
                        onKeyDown={e => {
                            if (e.key === "Escape") {
                                dismiss();
                            }
                        }}
                    >
                        <StyledField
                            type="text"
                            placeholder="Email"
                            name="username"
                        />
                        {errors.username && touched.username && (
                            <Error>{errors.email}</Error>
                        )}
                        <StyledField
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        {errors.password && touched.password && (
                            <Error>{errors.password}</Error>
                        )}
                        {status && status.msg && <Error>{status.msg}</Error>}
                        <Button type="submit" disabled={isSubmitting}>
                            Login
                        </Button>
                    </LoginSignUpContainer>
                )}
            />
        </Modal>
    );
};

export default withRouter(Login);
