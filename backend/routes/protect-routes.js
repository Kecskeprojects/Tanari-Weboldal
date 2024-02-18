import { expressjwt } from 'express-jwt';

export const checkUser = expressjwt({
	secret: process.env.SECRET,
	algorithms: ['HS256'],
});

/**
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 */
export function handleAuthorizationError(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({
			error: 'Authentication is required for this operation',
		});
	} else {
		next(err);
	}
}
