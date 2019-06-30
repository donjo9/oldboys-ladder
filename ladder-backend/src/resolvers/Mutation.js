import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password);

        if (args.data.email === "") {
            throw new Error("Missing email");
        }
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
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
                id: userId
            }
        });

        if (userHasTeam) {
            throw new Error("Only on team pr. user");
        }
        return prisma.mutation.createTeam(
            {
                data: {
                    ...args.data,
                    owner: {
                        connect: {
                            id: userId
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
    }
};

export { Mutation as default };
