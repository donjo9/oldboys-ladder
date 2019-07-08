import React, { useContext } from "react";

import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import environment from "../Environment";
import { LoginContext } from "./context";
import TeamInvitationForm from "./TeamInvitationForm";

const TeamProfile = props => {
    const {
        match: { params }
    } = props;

    const {
        state: { id }
    } = useContext(LoginContext);
    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query TeamProfileQuery($teamcode: String!) {
                    team(teamcode: $teamcode) {
                        id
                        name
                        players {
                            id
                            name
                        }
                        owner {
                            user {
                                id
                            }
                        }
                    }
                }
            `}
            render={({ error, props }) => {
                if (error) {
                    console.log(error);
                    return <div>Error!!</div>;
                }
                if (!props) {
                    return <div>Loading...</div>;
                }
                const { team } = props;
                return (
                    <React.Fragment>
                        {team ? (
                            <React.Fragment>
                                <div>{team.name}</div>
                                {team.players.map(player => {
                                    return (
                                        <div key={player.id}>{player.name}</div>
                                    );
                                })}
                                {id === team.owner.user.id ? (
                                    <TeamInvitationForm teamid={team.id} />
                                ) : null}
                            </React.Fragment>
                        ) : (
                            <div>No team found</div>
                        )}
                    </React.Fragment>
                );
            }}
            variables={{
                teamcode: params.id
            }}
        />
    );
};
export default TeamProfile;
