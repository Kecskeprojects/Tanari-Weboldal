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
			console.log(
				`Query: ${e.query}\nParams: ${e.params}\nDuration: ${e.duration} ms`
			);
		}
	}

	static async LogInfo(e) {
		if (process.env.ENVIRONMENT === 'development') {
			console.log(e);
		}
	}

	static async LogWarn(e) {
		console.log(e);
	}

	static async LogError(e) {
		console.log(e);
	}
}
