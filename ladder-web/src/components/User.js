import React from "react";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";

const User = props => {
    const { user } = props;
    return <div>{user.name}</div>;
};

export default createFragmentContainer(User, {
    user: graphql`
        fragment User_user on User {
            name
        }
    `
});
