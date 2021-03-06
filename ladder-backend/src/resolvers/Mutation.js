import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";
import generate from "nanoid/generate";

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password);

        if (args.data.email === "") {
            throw new Error("Missing email");
        }
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                playercode: generate(
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                    10
                ),
                password
            }
        });

        return {
            user,
            token: generateToken(user.id)
        };
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        });

        if (!user) {
            throw new Error("User/password wrong");
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password);

        if (!isMatch) {
            throw new Error("User/password wrong");
        }

        return {
            user,
            token: generateToken(user.id)
        };
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        return prisma.mutation.deleteUser(
            {
                where: {
                    id: userId
                }
            },
            info
        );
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        if (typeof args.data.password === "string") {
            args.data.password = await hashPassword(args.data.password);
        }

        return prisma.mutation.updateUser(
            {
                where: { id: userId },
                data: args.data
            },
            info
        );
    },
    async createTeam(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        if (!userId) {
            throw new Error("Please login to create new team");
        }
        const userHasTeam = await prisma.exists.Team({
            owner: {
                user: { id: userId }
            }
        });

        if (userHasTeam) {
            throw new Error("Only on team pr. user");
        }
        return prisma.mutation.createTeam(
            {
                data: {
                    ...args.data,
                    teamcode: generate(
                        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                        10
                    ),
                    owner: {
                        create: {
                            user: {
                                connect: {
                                    id: userId
                                }
                            }
                        }
                    },
                    players: {
                        connect: {
                            id: userId
                        }
                    }
                }
            },
            info
        );
    },
    async createTeamInvitation(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        if (!userId) {
            throw new Error("Please login to create new team invitation");
        }

        const teamOwner = await prisma.exists.Team({
            AND: [
                {
                    owner: {
                        user: { id: userId }
                    }
                },
                { id: args.data.teamid }
            ]
        });

        if (!teamOwner) {
            throw new Error("Only team owner can invite player");
        }

        return prisma.mutation.createTeamInvitation(
            {
                data: {
                    player: {
                        connect: {
                            playercode: args.data.playercode
                        }
                    },
                    team: {
                        connect: {
                            id: args.data.teamid
                        }
                    }
                }
            },
            info
        );
    },
    async acceptTeamInvitation(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        if (!userId) {
            throw new Error("Please login to accept team invitation");
        }

        const invitation = await prisma.query.teamInvitation(
            {
                where: {
                    id: args.invitation
                }
            },
            "{player { id } team { id}}"
        );

        if (!invitation) {
            throw new Error("No invitation found");
        }

        if (invitation.player.id !== userId) {
            throw new Error("Not your invitation!");
        }

        return prisma.mutation.updateTeam(
            {
                where: {
                    id: invitation.team.id
                },
                data: {
                    players: {
                        connect: {
                            id: invitation.player.id
                        }
                    },
                    playerinvitations: {
                        delete: {
                            id: args.invitation
                        }
                    }
                }
            },
            info
        );
    }
};

export { Mutation as default };
