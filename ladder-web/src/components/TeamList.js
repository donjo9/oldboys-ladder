import React from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import Team, { TeamListRow } from "./Team";
import environment from "../Environment";

const TeamListContainer = styled.table`
    margin: 0 auto;
    width: 100%;
    table-layout: fixed;
`;

const TeamListHeader = styled.th`
    font-size: 1rem;
    font-weight: bold;
    color: black;
    overflow: hidden;
    color: var(--border-hightlight);
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
                        id
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
                return (
                    <TeamListContainer>
                        <thead>
                            <TeamListRow>
                                <TeamListHeader>Rank</TeamListHeader>
                                <TeamListHeader>Team</TeamListHeader>
                                <TeamListHeader>Point</TeamListHeader>
                                <TeamListHeader>C</TeamListHeader>
                            </TeamListRow>
                        </thead>

                        <tbody>
                            {props.teams.map((team, index) => {
                                return (
                                    <Team
                                        key={team.id}
                                        team={team}
                                        rank={index + 1}
                                    />
                                );
                            })}
                        </tbody>
                    </TeamListContainer>
                );
            }}
        />
    );
};
export default TeamList;
