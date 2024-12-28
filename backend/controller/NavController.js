import NavService from '../database/services/NavService.js';
import BaseController from './BaseController.js';

export default class NavController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getAllForNav = async (req, res) => {
		try {
			const response = await NavService.getAllForNav();
			this.handleListResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getByUrl = async (req, res) => {
		try {
			const response = await NavService.getByUrl(req.params.url);
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
			}
			this.handleResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static create = async (req, res) => {
		try {
			const response = await NavService.create(
				req.body.parentNavUrl,
				req.body.name,
				req.body.url
			);
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
			}
			this.handleResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static delete = async (req, res) => {
		try {
			const response = await NavService.delete(req.params.id);
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
			}
			this.handleResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};
}
