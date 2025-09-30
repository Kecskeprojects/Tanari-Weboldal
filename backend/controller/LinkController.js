import LinkService from '../database/services/LinkService.js';
import BaseController from './BaseController.js';

export default class LinkController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getAll = async (req, res) => {
		try {
			const response = await LinkService.getAll(req.query.navId);
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
			}
			this.handleListResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getRecent = async (req, res) => {
		try {
			const response = await LinkService.getRecent();
			this.handleListResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getBySearchResult = async (req, res) => {
		try {
			const response = await LinkService.getBySearchResult(
				req.query.keyword
			);
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
				return;
			}
			this.handleListResponse(res, response.Data);
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
			const response = await LinkService.create(
				req.body.navId,
				req.body.url,
				req.body.title,
				req.body.openNewTab
			);
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
				return;
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
			const response = await LinkService.delete(req.params.id);
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
				return;
			}
			this.handleResponse(res, response.Data);
		} catch (e) {
			this.handleError(res, e);
		}
	};
}
