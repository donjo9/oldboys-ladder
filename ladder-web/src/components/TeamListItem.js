import React from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Link } from "react-router-dom";
import { AK47 } from "./ak47";

const TeamRow = styled(Link)`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 1fr;
    width: 100%;
    margin: 0 auto;
    color: white;
    text-decoration: none;
    &:nth-child(odd) {
        background-color: var(--teamlist-odd-background);
        &:hover {
            background-color: var(--teamlist-hover);
        }
    }
    &:nth-child(even) {
        background-color: var(--teamlist-even-background);
        &:hover {
            background-color: var(--teamlist-hover);
        }
    }
    div {
        line-height: 2rem;
        height: 2rem;
        text-align: center;
        &:nth-child(2) {
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;

const TeamListItem = props => {
    const { team, rank } = props;
    return (
        <TeamRow to={`/team/${team.teamcode}`}>
            <div>{rank}</div>
            <div>{team.name}</div>
            <div>{team.points}</div>
            <div>
                <AK47 style={{ fill: "var(--input-highlight)" }} />
            </div>
        </TeamRow>
    );
};

export default createFragmentContainer(TeamListItem, {
    team: graphql`
        fragment TeamListItem_team on Team {
            name
            teamcode
            points
        }
    `
});
