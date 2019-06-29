import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";
import environment from "../Environment";

const mutation = graphql`
    mutation CreateUserMutation($createUserInput: CreateUserInput!) {
        createUser(data: $createUserInput) {
            token
            user {
                id
            }
        }
    }
`;

export default (name, email, password, callback, onerror) => {
    const variables = {
        createUserInput: {
            name,
            email,
            password
        }
    };

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: response => {
            const id = response.createUser.user.id;
            const token = response.createUser.token;
            callback(id, token);
        },
        onError: error => onerror(error)
    });
};
