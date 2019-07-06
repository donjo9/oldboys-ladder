import React from "react";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from "react-relay";

const TeamInvitations = props => {
    const { teaminvitation } = props;

    return (
        <React.Fragment>
            <div>Hold invitationer:</div>
            {teaminvitation ? (
                teaminvitation.invitation.map(invitation => {
                    return (
                        <div key={invitation.team.id}>
                            {invitation.team.name} Accepter?
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
