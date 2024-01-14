import BaseController from './BaseController.js';
import { Prisma } from '../prisma/PrismaClient.js';

export default class LinkController extends BaseController {
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

			prisma.link
				.findMany({
					where: where,
					select: {
						LinkId: true,
						Url: true,
						Title: true,
						NavId: true,
					},
					orderBy: [{ CreatedOn: 'desc' }, { Title: 'asc' }],
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

	static create = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
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

			prisma.link
				.create({
					data: {
						Url: req.body.url,
						Title: req.body.title,
						NavId: nav.NavId,
						CreatedOn: new Date(),
					},
				})
				.then(async () => {
					this.handleResponse(res, {
						result: 'Link added to database.',
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

			prisma.link
				.delete({ where: { LinkId: id } })
				.then(async () => {
					this.handleResponse(res, {
						result: 'Link removed from database.',
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
