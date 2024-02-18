import BaseController from './BaseController.js';
import { Prisma } from '../prisma/PrismaClient.js';

export default class FileController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getAll = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			var where;
			if (req.query.navId) {
				const id = parseInt(req.query.navId);
				if (!id || Number.isNaN(id)) {
					this.handleError(res, null, 500, 'Id is not a number');
					return;
				}
				where = { NavId: id };
			}

			prisma.file
				.findMany({
					where: where,
					select: {
						FileId: true,
						Name: true,
						Extension: true,
						NavId: true,
					},
					orderBy: [{ CreatedOn: 'desc' }, { Name: 'asc' }],
				})
				.then(async (result) => {
					const completeList = [];
					if (result) {
						completeList.push(result);
					}
					this.handleResponse(res, completeList);
				})
				.catch(async (e) => {
					this.handleError(res, e);
				});
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getById = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			const id = parseInt(req.params.id);
			if (!id || Number.isNaN(id)) {
				this.handleError(res, null, 500, 'Id is not a number');
				return;
			}

			prisma.file
				.findFirst({ where: { FileId: id }, select: { Content: true } })
				.then(async (result) => {
					if (result) {
						this.handleFileResponse(res, result.Content);
						return;
					}
					this.handleError(res, null, 500, 'File not found');
				})
				.catch(async (e) => {
					this.handleError(res, e);
				});
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static create = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			if (!req.files) {
				this.handleResponse(res, { result: 'No files attached.' }, 500);
				return;
			}

			const navId = parseInt(req.body.navId);
			if (!navId || Number.isNaN(navId)) {
				this.handleError(res, null, 500, 'Id is not a number');
				return;
			}

			const name = req.files.mainfile.name.split('.')[0];
			const extension = req.files.mainfile.name.split('.')[1];

			prisma.file
				.create({
					data: {
						Content: req.files.mainfile.data,
						Name: name,
						Extension: extension,
						NavId: navId,
						CreatedOn: new Date(),
					},
				})
				.then(async () => {
					this.handleResponse(res, {
						result: 'File added to database.',
					});
				})
				.catch(async (e) => {
					this.handleError(res, e);
				});
		} catch (e) {
			this.handleError(res, e);
		}
	};

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static delete = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			const id = parseInt(req.params.id);
			if (!id || Number.isNaN(id)) {
				this.handleError(res, null, 500, 'Id is not a number');
				return;
			}

			prisma.file
				.delete({ where: { FileId: id } })
				.then(async () => {
					this.handleResponse(res, {
						result: 'File removed from database.',
					});
				})
				.catch(async (e) => {
					this.handleError(res, e);
				});
		} catch (e) {
			this.handleError(res, e);
		}
	};
}
