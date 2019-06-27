import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";
import environment from "../Environment";

const mutation = graphql`
    mutation LoginUserMutation($loginUserInput: LoginUserInput!) {
        login(data: $loginUserInput) {
            token
            user {
                id
            }
        }
    }
`;

export default (email, password, callback) => {
    const variables = {
        loginUserInput: {
            email,
            password
        }
    };

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: response => {
            const id = response.login.user.id;
            const token = response.login.token;
            callback(id, token);
        },
        onError: error => console.log(error)
    });
};
