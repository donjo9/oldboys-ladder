import React, { useContext } from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import { Redirect } from "react-router-dom";
import environment from "../Environment";
import { LoginContext } from "./context";

const Profile = props => {
    const { state } = useContext(LoginContext);
    return (
        <React.Fragment>
            {state.token ? (
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
            ) : (
                <Redirect to="/" />
            )}
        </React.Fragment>
    );
};
export default Profile;
