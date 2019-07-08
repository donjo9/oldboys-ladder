import React from "react";
import CreateTeamMutation from "../mutations/CreateTeamMutation";
import { Button } from "./Button";

import { Formik } from "formik";

import { LoginSignUpContainer, Error, StyledField } from "./LoginSignupCommon";
import Modal from "./Modal";

const CreateTeam = props => {
    const { visable, show, dismiss } = props;
    return (
        <React.Fragment>
            <Button onClick={show}>Opret hold</Button>
            <Modal visable={visable} dismiss={dismiss}>
                <Formik
                    initialValues={{ name: "", shortname: "" }}
                    onSubmit={(values, actions) => {
                        CreateTeamMutation(
                            values.name,
                            values.shortname,
                            (name, shortname) => {
                                dismiss();
                            },
                            err => {
                                console.log(JSON.stringify(err, null, 4));
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
                                placeholder="Navn"
                                name="name"
                            />
                            {errors.name && touched.name && (
                                <Error>{errors.name}</Error>
                            )}
                            <StyledField
                                type="text"
                                placeholder="Tag"
                                name="shortname"
                            />
                            {errors.shortname && touched.shortname && (
                                <Error>{errors.shortname}</Error>
                            )}
                            {status && status.msg && (
                                <Error>{status.msg}</Error>
                            )}
                            <Button type="submit" disabled={isSubmitting}>
                                Opret hold
                            </Button>
                        </LoginSignUpContainer>
                    )}
                />
            </Modal>
        </React.Fragment>
    );
};

export default CreateTeam;
