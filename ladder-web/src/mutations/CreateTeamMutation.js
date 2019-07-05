import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";
import environment from "../Environment";

const mutation = graphql`
    mutation CreateTeamMutation($createTeamInput: CreateTeamInput!) {
        createTeam(data: $createTeamInput) {
            name
            shortname
            owner {
                user {
                    name
                }
            }
        }
    }
`;
let id = 0;
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
        onError: error => onerror(error)
    });
};
