import BaseService from './BaseService';

export default class fileService extends BaseService {
	static async GetAll(navId) {
		var fileList = null;
		try {
			var route = '/File/GetAll/';
			if (navId) {
				route += `?navId=${navId}`;
			}
			const res = await this.Get(route);
			const body = await res.json();
			//console.log(body);
			fileList = body[0];
		} catch (e) {
			console.log(e);
		}
		return fileList;
	}

	static async GetById(id) {
		var file = null;
		try {
			const res = await this.Get(`/File/GetById/${id}`);
			const body = await res.blob();
			//console.log(body);
			file = body;
		} catch (e) {
			console.log(e);
		}
		return file;
	}

	static async Create(formData, token) {
		var result = null;
		try {
			const res = await this.Post('/File/Create/', token, formData);
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
			const res = await this.Delete(`/File/Delete/${id}`, token);
			const body = await res.json();
			//console.log(body);
			result = body.result;
		} catch (e) {
			console.log(e);
		}
		return result;
	}
}
