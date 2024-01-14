import BaseService from './BaseService';

export default class linkService extends BaseService {
	static async GetAll(location) {
		var linkList = null;
		try {
			var route = '/Link/GetAll/';
			if (location) {
				route += `?navName=${location}`;
			}
			const res = await this.Get(route);
			const body = await res.json();
			//console.log(body);
			linkList = body[0];
		} catch (e) {
			console.log(e);
		}
		return linkList;
	}

	static async Create(formData, token) {
		var result = null;
		try {
			const res = await this.Post('/Link/Create/', token, formData);
			const body = await res.json();
			//console.log(body);
			result = body.result;
		} catch (e) {
			console.log(e);
		}
		return result;
	}

	static async Remove(id, token) {
		var result = null;
		try {
			const res = await this.Delete(`/Link/Delete/${id}`, token);
			const body = await res.json();
			//console.log(body);
			result = body.result;
		} catch (e) {
			console.log(e);
		}
		return result;
	}
}
