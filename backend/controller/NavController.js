import { Prisma } from '../prisma/PrismaClient.js';
import BaseController from './BaseController.js';

export default class NavController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static getAllForNav = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			prisma.nav
				.findMany({
					where: { ParentNavId: null },
					include: {
						other_Nav: {
							include: {
								other_Nav: {
									include: {
										other_Nav: {
											include: {
												other_Nav: {
													include: {
														other_Nav: {
															include: {
																other_Nav: true,
															},
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
				}) //Pandora
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
	static getByUrl = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			prisma.nav
				.findFirst({
					where: { Url: req.params.url },
					select: { NavId: true, Url: true, Name: true },
				})
				.then(async (result) => {
					this.handleResponse(res, result);
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
			var nav = null;
			if (req.body.parentNavUrl) {
				nav = await prisma.nav.findFirst({
					where: { Url: req.body.parentNavUrl },
				});
			}

			prisma.nav
				.create({
					data: {
						ParentNavId: nav?.NavId,
						Name: req.body.name,
						Url: req.body.url,
						CreatedOn: new Date(),
					},
				})
				.then(async () => {
					this.handleResponse(res, {
						result: 'Nav added to database.',
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

			prisma.nav
				.delete({ where: { NavId: id } })
				.then(async () => {
					this.handleResponse(res, {
						result: 'Nav removed from database.',
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
