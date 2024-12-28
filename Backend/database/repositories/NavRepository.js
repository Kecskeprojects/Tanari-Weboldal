import { Prisma } from '../../prisma/PrismaClient.js';

export default class NavRepository {
	static async getAllForNav() {
		const prisma = Prisma.getPrisma();

		return await prisma.nav.findMany({
			where: { ParentNavId: null },
			//Pandora
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
		});
	}

	static async getById(filter) {
		const prisma = Prisma.getPrisma();

		return await prisma.nav.findFirst({ where: filter });
	}

	static async getByUrl(filter) {
		const prisma = Prisma.getPrisma();

		return await prisma.nav.findFirst({
			where: filter,
			select: { NavId: true, Url: true, Name: true },
		});
	}

	static async create(data) {
		const prisma = Prisma.getPrisma();
		await prisma.nav.create({ data: data });

		return { result: 'Nav added to database' };
	}

	static async delete(filter) {
		const prisma = Prisma.getPrisma();
		await prisma.nav.delete({ where: filter });

		return { result: 'Nav removed from database' };
	}
}
