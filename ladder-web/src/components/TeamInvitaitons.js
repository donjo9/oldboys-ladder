import React, { useContext } from "react";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";
import { Button } from "./Button";
import AcceptInvitationMutation from "../mutations/AcceptInvitationMutation";
import { LoginContext } from "./context";

const TeamInvitations = props => {
    const { teaminvitation } = props;
    const tokenContext = useContext(LoginContext);
    return (
        <React.Fragment>
            <div>Hold invitationer:</div>
            {teaminvitation ? (
                teaminvitation.invitation.map(invitation => {
                    return (
                        <div key={invitation.id}>
                            {invitation.team.name}{" "}
                            <Button
                                onClick={() =>
                                    AcceptInvitationMutation(
                                        invitation.id,
                                        invitation.team.id,
                                        tokenContext.state.id,
                                        err => {
                                            console.log(
                                                JSON.stringify(err, null, 4)
                                            );
                                        }
                                    )
                                }
                            >
                                Accepter?
                            </Button>
                        </div>
                    );
                })
            ) : (
                <div>Ingen hold invitationer</div>
            )}
        </React.Fragment>
    );
};

export default createFragmentContainer(TeamInvitations, {
    teaminvitation: graphql`
        fragment TeamInvitaitons_teaminvitation on User {
            invitation {
                id
                team {
                    id
                    name
                }
            }
        }
    `
});
