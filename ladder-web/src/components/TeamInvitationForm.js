import React from "react";
import { Formik, ErrorMessage } from "formik";
import { LoginSignUpContainer, StyledField } from "./LoginSignupCommon";
import { Button } from "./Button";
import CreateInvitationMutation from "../mutations/CreateInvitationMutation";
const TeamInvitationForm = props => {
    return (
        <React.Fragment>
            <Formik
                initialValues={{ playercode: "" }}
                onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                    CreateInvitationMutation(
                        values.playercode,
                        props.teamid,
                        () => resetForm(),
                        err => {
                            setStatus({
                                msg: err.source.errors[0].message
                            });
                            setSubmitting(false);
                        }
                    );
                }}
            >
                {({ isSubmitting }) => (
                    <LoginSignUpContainer style={{ flexDirection: "row" }}>
                        <StyledField type="text" name="playercode" />
                        <ErrorMessage name="playercode" component="div" />
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </LoginSignUpContainer>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default TeamInvitationForm;
