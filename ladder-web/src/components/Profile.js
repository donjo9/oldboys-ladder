import React from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import environment from "../Environment";

const Profile = props => {
    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query ProfileQuery {
                    me {
                        name
                        email
                    }
                }
            `}
            variables={{}}
            render={({ error, props }) => {
                if (error) {
                    console.log(error);
                    return <div>Error!!</div>;
                }
                if (!props) {
                    return <div>Loading...</div>;
                }
                return (
                    <div>
                        <div>{props.me.name}</div>
                        <div>{props.me.email}</div>
                    </div>
                );
            }}
        />
    );
};
export default Profile;
