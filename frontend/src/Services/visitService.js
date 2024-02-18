import BaseService from './BaseService';

export default class visitService extends BaseService {
	static async GetVisits() {
		var visitCount = null;
		try {
			const res = await this.Get(`/Visit/Get`);
			const body = await res.json();

			if (process.env.NODE_ENV !== 'production') {
				console.log(body);
			}

			visitCount = BigInt(body?.count);
		} catch (e) {
			console.log(e);
		}
		return visitCount;
	}

	static async Update() {
		var result = null;
		try {
			const res = await this.Put('/Visit/Update/');
			const body = await res.json();

			if (process.env.NODE_ENV !== 'production') {
				console.log(body);
			}

			result = body.result;
		} catch (e) {
			console.log(e);
		}
		return result;
	}
}
