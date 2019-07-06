import React from "react";

import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import environment from "../Environment";

const TeamProfile = props => {
    const {
        match: { params }
    } = props;

    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query TeamProfileQuery($teamcode: String!) {
                    team(teamcode: $teamcode) {
                        name
                        players {
                            id
                            name
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
