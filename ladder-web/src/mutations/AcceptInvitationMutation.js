import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";
import environment from "../Environment";

const mutation = graphql`
    mutation AcceptInvitationMutation($invitation: String!) {
        acceptTeamInvitation(invitation: $invitation) {
            id
            name
            shortname
            teamcode
            owner {
                id
                user {
                    id
                }
                team {
                    id
                    name
                }
            }
        }
    }
`;

export default (invitation, teamid, userid, onerror) => {
    const variables = {
        invitation: invitation
    };
    console.log(userid);
    commitMutation(environment, {
        mutation,
        variables,
        onError: error => onerror(error),
        optimisticUpdater: store => {
            //debugger;
            const user = store.get(userid);
            const newTeamId = "client:teamid" + userid;
            const team = store.get(teamid);

            const newTeam = store.create(newTeamId, "Team");
            newTeam.setValue(team.getValue("name"), "name");
            newTeam.setValue(team.getValue("teamcode"), "teamcode");

            const invitationNodes = user.getLinkedRecords("invitation");
            const remainingInvitations = invitationNodes.filter(
                node => node.getValue("id") !== invitation
            );
            user.setLinkedRecords(remainingInvitations, "invitation");
            user.setLinkedRecord(newTeam, "team");
        },
        updater: store => {
            //debugger;
            const teamreturn = store.getRootField("acceptTeamInvitation");
            const user = store.get(userid);

            const invitationNodes = user.getLinkedRecords("invitation");
            const remainingInvitations = invitationNodes.filter(
                node => node.getValue("id") !== invitation
            );
            user.setLinkedRecords(remainingInvitations, "invitation");

            const team = store.get(teamreturn.getValue("id"));
            user.setLinkedRecord(team, "team");
        }
    });
};
