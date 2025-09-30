import FileService from '../database/services/FileService.js';
import BaseController from './BaseController.js';

export default class FileController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getAll = async (req, res) => {
		try {
			const response = await FileService.getAll(req.query.navId);
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
	static getRecent = async (req, res) => {
		try {
			const response = await FileService.getRecent();
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
			const response = await FileService.getBySearchResult(
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
	static getById = async (req, res) => {
		try {
			const response = await FileService.getById(req.params.id);
			if (response.Error) {
				this.handleError(res, null, 500, response.Error);
				return;
			}
			this.handleFileResponse(res, response.Data);
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
			const response = await FileService.create(
				req.files?.mainfile,
				req.body.navId
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
			const response = await FileService.delete(req.params.id);
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
