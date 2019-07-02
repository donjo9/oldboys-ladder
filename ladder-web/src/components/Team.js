import React from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";

const TeamListRow = styled.tr``;

const Team = props => {
    const { team, rank } = props;
    console.log(team);
    return (
        <TeamListRow>
            <th>{team.name}</th>
            <th>{team.points}</th>
            <th>{rank}</th>
        </TeamListRow>
    );
};

export { TeamListRow };

export default createFragmentContainer(Team, {
    team: graphql`
        fragment Team_team on Team {
            name
            points
        }
    `
});
