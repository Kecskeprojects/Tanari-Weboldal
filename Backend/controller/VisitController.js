import { Prisma } from '../prisma/PrismaClient.js';
import BaseController from './BaseController.js';

export default class VisitController extends BaseController {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 */
	static get = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			prisma.visit
				.findFirst({
					where: { VisitorId: 1 },
					select: { VisitorId: true, VisitCount: true },
				})
				.then(async (result) => {
					if (result) {
						this.handleResponse(res, {
							count: result.VisitCount.toString(),
						});
						return;
					}
					this.handleError(res, null, 500, 'Counter not found');
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
	static update = async (req, res) => {
		const prisma = Prisma.getPrisma();
		try {
			const visits = await prisma.visit.findFirst({
				where: { VisitorId: 1 },
			});
			if (!visits) {
				this.handleResponse(
					res,
					{ result: 'Counter could not be found' },
					500
				);
			}

			prisma.visit
				.update({
					where: { VisitorId: visits.VisitorId },
					data: {
						VisitCount: visits.VisitCount + 1n,
						ModifiedOn: new Date(),
					},
				})
				.then(async () => {
					this.handleResponse(res, {
						result: 'Visit count updated',
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
