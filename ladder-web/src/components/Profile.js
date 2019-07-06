import React, { useContext } from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import { Redirect } from "react-router-dom";
import environment from "../Environment";
import { LoginContext } from "./context";
import Team from "./Team";
import TeamInvitaitons from "./TeamInvitaitons";

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
                                id
                                name
                                email
                                playercode
                                ...TeamInvitaitons_teaminvitation
                                ...Team_team
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
                        const { me } = props;
                        return (
                            <div>
                                <div>{props.me.name}</div>
                                <div>{props.me.email}</div>
                                <div>Spiller kode: {props.me.playercode}</div>
                                <Team team={me} />
                                <TeamInvitaitons teaminvitation={me} />
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
