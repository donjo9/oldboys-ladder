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
                    <React.Fragment>
                        <div>Inviter spiller:</div>
                        <LoginSignUpContainer style={{ flexDirection: "row" }}>
                            <StyledField
                                type="text"
                                name="playercode"
                                placeholder="Spiller kode"
                            />
                            <ErrorMessage name="playercode" component="div" />
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </LoginSignUpContainer>
                    </React.Fragment>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default TeamInvitationForm;
