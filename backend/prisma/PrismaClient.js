import { PrismaClient } from '@prisma/client';
import PrismaLogger from './PrismaLogger';

export class Prisma {
	static Prisma;

	/**
	 * Returns Client
	 * @returns {PrismaClient}
	 */
	static getPrisma() {
		// create a new instance of PrismaClient if one isn't already created
		if (this.Prisma) {
			return this.Prisma;
		}

		this.Prisma = new PrismaClient(PrismaLogger.ClientOptions);

		this.Prisma.$on('query', PrismaLogger.LogQuery);
		this.Prisma.$on('info', PrismaLogger.LogInfo);
		this.Prisma.$on('warn', PrismaLogger.LogWarn);
		this.Prisma.$on('error', PrismaLogger.LogError);

		return this.Prisma;
	}
}
