export default class PrismaLogger {
	static ClientOptions = {
		log: [
			{
				emit: 'event',
				level: 'query',
			},
			{
				emit: 'event',
				level: 'info',
			},
			{
				emit: 'event',
				level: 'warn',
			},
			{
				emit: 'event',
				level: 'error',
			},
		],
	};

	static async LogQuery(e) {
		if (process.env.ENVIRONMENT === 'development') {
			console.debug(
				`Query: ${e.query}\nParams: ${e.params}\nDuration: ${e.duration} ms`
			);
		}
	}

	static async LogInfo(e) {
		if (process.env.ENVIRONMENT === 'development') {
			console.info(e);
		}
	}

	static async LogWarn(e) {
		if (process.env.ENVIRONMENT === 'development') {
			console.warn(e);
		}
	}

	static async LogError(e) {
		if (process.env.ENVIRONMENT === 'development') {
			console.error(e);
		}
	}
}
