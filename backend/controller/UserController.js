import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DateHelper from '../helpers/DateHelper.js';
import BaseController from './BaseController.js';

export default class UserController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static login = async (req, res) => {
		try {
			const userMatches = bcrypt.compareSync(
				req.body.username,
				process.env.ENCRYPTED_USERNAME //Todo: Create a more complex login name
			);
			if (!userMatches) {
				this.handleError(res, null, 401, 'Incorrect user');
				return;
			}

			const uuid = crypto.randomUUID();
			const token = jwt.sign({ id: uuid }, process.env.SECRET, {
				expiresIn: '7d',
			}); //Todo: Create a more complex Secret Key
			this.handleResponse(res, {
				accessToken: token,
				id: uuid,
				expiresOn: DateHelper.addDays(new Date(), 7),
			});
		} catch (err) {
			this.handleError(res, err, 500, 'Internal error occured');
		}
	};
}
