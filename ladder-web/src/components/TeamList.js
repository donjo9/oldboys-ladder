import React from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import TeamListItem from "./TeamListItem";
import environment from "../Environment";

const TeamListContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 1fr;
    margin: 0 auto;
    width: 100%;
    table-layout: fixed;
    text-align: center;
    &:nth-child(2) {
        text-align: left;
    }
`;

const TeamListHeader = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: black;
    overflow: hidden;
    color: var(--common-highlight);
    &:nth-child(2) {
        text-align: left;
    }
`;

const TeamList = props => {
    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query TeamListQuery {
                    teams {
                        teamcode
                        ...TeamListItem_team
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
                    <React.Fragment>
                        <TeamListContainer>
                            <TeamListHeader>Rank</TeamListHeader>
                            <TeamListHeader>Team</TeamListHeader>
                            <TeamListHeader>Point</TeamListHeader>
                            <TeamListHeader>Challenge</TeamListHeader>
                        </TeamListContainer>

                        {props.teams.map((team, index) => {
                            return (
                                <TeamListItem
                                    key={team.teamcode}
                                    team={team}
                                    rank={index + 1}
                                />
                            );
                        })}
                    </React.Fragment>
                );
            }}
        />
    );
};
export default TeamList;
