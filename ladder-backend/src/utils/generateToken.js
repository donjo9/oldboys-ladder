import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = userId => {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d"
    });
};
export { JWT_SECRET, generateToken as default };
