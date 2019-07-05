import React from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { AK47 } from "./ak47";

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

const TeamListItem = props => {
    const { team, rank } = props;
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
            <td>
                <AK47 style={{ fill: "var(--input-highlight)" }} />
            </td>
        </TeamListRow>
    );
};

export { TeamListRow };

export default createFragmentContainer(TeamListItem, {
    team: graphql`
        fragment TeamListItem_team on Team {
            name
            points
        }
    `
});
