import React from "react";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";

import CreateTeam from "./CreateTeam";

const Team = props => {
    const {
        team: { team, ownTeam }
    } = props;

    return (
        <React.Fragment>
            {ownTeam ? (
                <div>Eget hold: {ownTeam.team.name}</div>
            ) : team ? (
                <div>Du er på holdet: {team.name}</div>
            ) : (
                <React.Fragment>
                    <div>Du er ikke på noget hold</div>
                    <CreateTeam />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default createFragmentContainer(Team, {
    team: graphql`
        fragment Team_team on User {
            team {
                name
            }
            ownTeam {
                team {
                    name
                    id
                }
            }
        }
    `
});
