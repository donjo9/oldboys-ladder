import React from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";

const TeamListRow = styled.tr`
    td {
        text-align: center;
    }
    td:nth-child(2) {
        text-align: left;
        div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`;

const Team = props => {
    const { team, rank } = props;
    console.log(team);
    return (
        <TeamListRow>
            <td>{rank}</td>
            <td>
                <div>{team.name}</div>
            </td>
            <td>
                <div />
                {team.points}
            </td>
            <td>X</td>
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
