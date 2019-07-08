import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";
import environment from "../Environment";

const mutation = graphql`
    mutation CreateTeamMutation($createTeamInput: CreateTeamInput!) {
        createTeam(data: $createTeamInput) {
            id
            name
            shortname
            teamcode
            owner {
                id
                team {
                    id
                    name
                }
            }
        }
    }
`;

export default (name, shortname, callback, onerror) => {
    const variables = {
        createTeamInput: {
            name,
            shortname
        }
    };

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: response => {
            const name = response.createTeam.name;
            const shortname = response.createTeam.shortname;
            callback(name, shortname);
        },
        onError: error => onerror(error),
        updater: store => {
            const user = store.get("cjxgdb25h00090704njtr3zoj");
            const teamreturn = store.getRootField("createTeam");
            const teamownerreturn = teamreturn.getLinkedRecord("owner");

            const team = store.get(teamreturn.getValue("id"));
            const teamowner = store.get(teamownerreturn.getValue("id"));
            user.setLinkedRecord(team, "team");
            user.setLinkedRecord(teamowner, "ownTeam");
        }
    });
};
