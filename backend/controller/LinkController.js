import { Prisma } from '../prisma/PrismaClient.js';
import BaseController from './BaseController.js';

export default class LinkController extends BaseController {
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

			prisma.link
				.findMany({
					where: where,
					select: {
						LinkId: true,
						Url: true,
						Title: true,
						OpenNewTab: true,
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

	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getRecent = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			prisma.link
				.findMany({
					select: {
						LinkId: true,
						Url: true,
						Title: true,
						OpenNewTab: true,
						NavId: true,
					},
					orderBy: [{ CreatedOn: 'desc' }, { Title: 'asc' }],
					take: 5,
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
	static create = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			const navId = parseInt(req.body.navId);
			if (!navId || Number.isNaN(navId)) {
				this.handleError(res, null, 500, 'Id is not a number');
				return;
			}

			prisma.link
				.create({
					data: {
						Url: req.body.url,
						Title: req.body.title,
						OpenNewTab: req.body.openNewTab === 'true',
						NavId: navId,
						CreatedOn: new Date(),
					},
				})
				.then(async () => {
					this.handleResponse(res, {
						result: 'Link added to database',
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

			prisma.link
				.delete({ where: { LinkId: id } })
				.then(async () => {
					this.handleResponse(res, {
						result: 'Link removed from database',
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
