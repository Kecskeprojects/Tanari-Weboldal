import { Prisma } from '../../prisma/PrismaClient.js';

export default class FileRepository {
	static async getAll(filter) {
		const prisma = Prisma.getPrisma();

		return await prisma.file.findMany({
			where: filter,
			select: {
				FileId: true,
				Name: true,
				Extension: true,
				NavId: true,
			},
			orderBy: [{ CreatedOn: 'desc' }, { Name: 'asc' }],
		});
	}

	static async getRecent() {
		const prisma = Prisma.getPrisma();
		return await prisma.file.findMany({
			select: {
				FileId: true,
				Name: true,
				Extension: true,
				NavId: true,
			},
			orderBy: [{ CreatedOn: 'desc' }, { Name: 'asc' }],
			take: 5,
		});
	}

	static async getBySearchResult(filter) {
		const prisma = Prisma.getPrisma();
		return await prisma.file.findMany({
			where: filter,
			select: {
				FileId: true,
				Name: true,
				Extension: true,
				NavId: true,
			},
			orderBy: [{ CreatedOn: 'desc' }, { Name: 'asc' }],
		});
	}

	static async getById(filter) {
		const prisma = Prisma.getPrisma();
		return await prisma.file.findFirst({
			where: filter,
			select: { Content: true },
		});
	}

	static async create(data) {
		const prisma = Prisma.getPrisma();
		await prisma.file.create({ data: data });

		return { result: 'File added to database' };
	}

	static async delete(filter) {
		const prisma = Prisma.getPrisma();
		await prisma.file.delete({ where: filter });

		return { result: 'File removed from database' };
	}
}
