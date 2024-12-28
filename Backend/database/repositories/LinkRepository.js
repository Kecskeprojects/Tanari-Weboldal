import { Prisma } from '../../prisma/PrismaClient.js';

export default class LinkRepository {
	static async getAll(filter) {
		const prisma = Prisma.getPrisma();

		return await prisma.link.findMany({
			where: filter,
			select: {
				LinkId: true,
				Url: true,
				Title: true,
				OpenNewTab: true,
				NavId: true,
			},
			orderBy: [{ CreatedOn: 'desc' }, { Title: 'asc' }],
		});
	}

	static async getRecent() {
		const prisma = Prisma.getPrisma();

		return await prisma.link.findMany({
			select: {
				LinkId: true,
				Url: true,
				Title: true,
				OpenNewTab: true,
				NavId: true,
			},
			orderBy: [{ CreatedOn: 'desc' }, { Title: 'asc' }],
			take: 5,
		});
	}

	static async getBySearchResult(filter) {
		const prisma = Prisma.getPrisma();

		return await prisma.link.findMany({
			where: filter,
			select: {
				LinkId: true,
				Url: true,
				Title: true,
				OpenNewTab: true,
				NavId: true,
			},
			orderBy: [{ CreatedOn: 'desc' }, { Title: 'asc' }],
		});
	}

	static async create(data) {
		const prisma = Prisma.getPrisma();
		await prisma.link.create({ data: data });

		return { result: 'Link added to database' };
	}

	static async delete(filter) {
		const prisma = Prisma.getPrisma();
		await prisma.link.delete({ where: filter });

		return { result: 'Link removed from database' };
	}
}
