import React from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import environment from "../Environment";
import User from "./User";

const UserList = props => {
    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query UserListQuery {
                    users {
                        id
                        ...User_user
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
                    <div>
                        {props.users.map(user => (
                            <User key={user.id} user={user} />
                        ))}
                    </div>
                );
            }}
        />
    );
};

export default UserList;
