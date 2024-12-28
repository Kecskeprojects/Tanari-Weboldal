import VisitService from '../database/services/VisitService.js';
import BaseController from './BaseController.js';

export default class VisitController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static get = async (req, res) => {
		try {
			const response = await VisitService.get();
			this.handleResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static update = async (req, res) => {
		try {
			const response = await VisitService.update();
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
			}
			this.handleResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};
}
