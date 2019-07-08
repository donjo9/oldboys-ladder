import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CreateTeam from "./CreateTeam";
import Crown from "./crown.js";

const TeamLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

const Team = props => {
    const {
        team: { team, ownTeam }
    } = props;
    const [showCreateTeam, setShowCreateTeam] = useState(false);
    return (
        <React.Fragment>
            {team ? (
                <TeamLink to={`/team/${team.teamcode}`}>
                    Hold: {team.name} {ownTeam.team && <Crown />}
                </TeamLink>
            ) : (
                <React.Fragment>
                    <div>Du er ikke på noget hold</div>
                    <CreateTeam
                        visable={showCreateTeam}
                        show={() => setShowCreateTeam(true)}
                        dismiss={() => setShowCreateTeam(false)}
                    />
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
                teamcode
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
