import { expressjwt } from "express-jwt";

export const checkUser = expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"]
});

export function handleAuthorizationError(err, req, res, next){
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: 'Authentication is required for this operation.' });
    } else {
        next(err);
    }
};