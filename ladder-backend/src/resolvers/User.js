import getUserId from "../utils/getUserId";

const User = {
    email: {
        fragment: "fragment userId on User { id }",
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false);

            if (userId && parent.id === userId) {
                return parent.email;
            }

            return null;
        }
    }
};

export { User as default };
