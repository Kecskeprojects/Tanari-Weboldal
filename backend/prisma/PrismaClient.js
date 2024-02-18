import { PrismaClient } from '@prisma/client';
import PrismaLogger from './PrismaLogger.js';

export class Prisma {
	/**
	 * someProperty is an example property that is set to `true`
	 * @type {PrismaClient}
	 * @private
	 */
	static PrismaClient;

	/**
	 * @returns {PrismaClient}
	 */
	static getPrisma() {
		// create a new instance of PrismaClient if one isn't already created
		if (this.PrismaClient) {
			return this.PrismaClient;
		}

		this.PrismaClient = new PrismaClient(PrismaLogger.ClientOptions);

		this.PrismaClient.$on('query', PrismaLogger.LogQuery);
		this.PrismaClient.$on('info', PrismaLogger.LogInfo);
		this.PrismaClient.$on('warn', PrismaLogger.LogWarn);
		this.PrismaClient.$on('error', PrismaLogger.LogError);

		return this.PrismaClient;
	}
}
