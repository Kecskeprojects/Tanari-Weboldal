import UserService from '../database/services/UserService.js';
import BaseController from './BaseController.js';

export default class UserController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static login = async (req, res) => {
		try {
			const response = UserService.login(req.body.username);
			if (response.Error) {
				this.handleError(
					res,
					null,
					response.Error === 'Incorrect user' ? 401 : 500,
					response.Error
				);
			}
			this.handleResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};
}
