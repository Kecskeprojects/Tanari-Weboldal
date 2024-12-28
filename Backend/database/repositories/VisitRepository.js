import { Prisma } from '../../prisma/PrismaClient.js';

export default class VisitRepository {
	static async get() {
		const prisma = Prisma.getPrisma();

		const visit = await prisma.visit.findFirst({
			where: { VisitorId: 1 },
			select: { VisitorId: true, VisitCount: true },
		});

		return { count: visit.VisitCount.toString() };
	}

	static async getVisitItem() {
		const prisma = Prisma.getPrisma();

		const visit = await prisma.visit.findFirst({
			where: { VisitorId: 1 },
		});

		return visit;
	}

	static async update(data) {
		const prisma = Prisma.getPrisma();
		await prisma.visit.update({ where: { VisitorId: 1 }, data: data });

		return { result: 'Visit count updated' };
	}
}
