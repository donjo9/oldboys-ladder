import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";
import environment from "../Environment";

const mutation = graphql`
    mutation CreateInvitationMutation(
        $createInvitationInput: CreateTeamInviteInput!
    ) {
        createTeamInvitation(data: $createInvitationInput) {
            id
            player {
                id
                name
            }
        }
    }
`;

export default (playercode, teamid, callback, onerror) => {
    const variables = {
        createInvitationInput: {
            playercode,
            teamid
        }
    };

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: () => callback(),
        onError: error => onerror(error)
        /*updater: store => {
            const teamreturn = store.getRootField("createTeam");
            const teamownerreturn = teamreturn.getLinkedRecord("owner");
            const user = store.get(
                teamownerreturn.getLinkedRecord("user").getValue("id")
            );

            const team = store.get(teamreturn.getValue("id"));
            const teamowner = store.get(teamownerreturn.getValue("id"));
            user.setLinkedRecord(team, "team");
            user.setLinkedRecord(teamowner, "ownTeam");
        }*/
    });
};
