import BaseController from './BaseController.js';
import { Prisma } from '../prisma/PrismaClient.js';

export default class FileController extends BaseController {
	static getAll = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			var where;
			if (req.query?.navName) {
				const nav = await prisma.nav.findFirst({
					where: { Name: req.query.navName },
				});
				where = { NavId: nav?.NavId };
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

	static getById = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			const id = parseInt(req.params.id);
			if (!id || Number.isNaN(id)) {
				this.handleError(res, null, 500, 'Id is not a number');
				return;
			}

			prisma.file
				.findFirst({ where: { FileId: id } })
				.then(async (result) => {
					this.handleFileResponse(res, result.Content);
				})
				.catch(async (e) => {
					this.handleError(res, e);
				});
		} catch (e) {
			this.handleError(res, e);
		}
	};

	static create = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			if (!req.files) {
				this.handleResponse(res, { result: 'No files attached.' }, 500);
				return;
			}

			const nav = await prisma.nav.findFirst({
				where: { Name: req.body.navName },
			});
			if (!nav) {
				this.handleResponse(
					res,
					{ result: 'Location does not exist.' },
					500
				);
				return;
			}

			const name = req.files.file.name.split('.')[0];
			const extension = req.files.file.name.split('.')[1];

			prisma.file
				.create({
					data: {
						Content: req.files.file.data,
						Name: name,
						Extension: extension,
						NavId: nav.NavId,
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
