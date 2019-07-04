import React from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import Team, { TeamListRow } from "./Team";
import environment from "../Environment";

const TeamListContainer = styled.table`
    margin: 0 auto;
    min-width: 400px;
`;

const TeamListHeader = styled.th`
    font-size: 1rem;
    font-weight: bold;
    color: black;
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
                                <TeamListHeader>Name</TeamListHeader>
                                <TeamListHeader>Point</TeamListHeader>
                                <TeamListHeader>Rank</TeamListHeader>
                            </TeamListRow>
                        </thead>

                        <tbody>
                            {props.teams.map((team, index) => {
                                return (
                                    <Team
                                        key={team.id}
                                        team={team}
                                        rank={index+1}
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