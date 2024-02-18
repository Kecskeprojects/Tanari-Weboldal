import BaseService from './BaseService';

export default class fileService extends BaseService {
	/**
	 * @param {Number} navId
	 * @returns {Array}
	 */
	static async GetAll(navId) {
		var fileList = null;
		try {
			var route = '/File/GetAll/';
			if (navId) {
				route += `?navId=${navId}`;
			}
			const res = await this.Get(route);
			const body = await res.json();

			if (process.env.NODE_ENV !== 'production') {
				console.log(body);
			}

			fileList = body[0];
		} catch (e) {
			console.log(e);
		}
		return fileList;
	}

	/**
	 * @param {Number} id
	 */
	static async GetById(id) {
		var file = null;
		try {
			const res = await this.Get(`/File/GetById/${id}`);
			const body = await res.blob();

			if (process.env.NODE_ENV !== 'production') {
				console.log(body);
			}

			file = body;
		} catch (e) {
			console.log(e);
		}
		return file;
	}

	/**
	 * @param {FormData} formData
	 * @param {String} token
	 * @returns {Object}
	 */
	static async Create(formData, token) {
		var result = null;
		try {
			const res = await this.Post('/File/Create/', token, formData);
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

	/**
	 * @param {Number} id
	 * @param {String} token
	 * @returns {Object}
	 */
	static async Remove(id, token) {
		var result = null;
		try {
			const res = await this.Delete(`/File/Delete/${id}`, token);
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
