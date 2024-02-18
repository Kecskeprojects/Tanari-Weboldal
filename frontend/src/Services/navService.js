import LocationData from '../Models/LocationData';
import BaseService from './BaseService';

export default class navService extends BaseService {
	/**
	 * @returns {Array}
	 */
	static async GetAllForNavbar() {
		var navList = null;
		try {
			const res = await this.Get('/Nav/GetAllForNavbar/');
			const body = await res.json();
			//console.log(body);
			navList = body[0];
		} catch (e) {
			console.log(e);
		}
		return navList;
	}

	/**
	 * @param {String} url
	 * @returns {Object}
	 */
	static async GetByUrl(url) {
		var nav = new LocationData();
		try {
			const res = await this.Get(`/Nav/GetById/${url}`);
			const body = await res.json();
			//console.log(body);
			nav = new LocationData(body);
		} catch (e) {
			console.log(e);
		}
		return nav;
	}

	/**
	 * @param {FormData} formData
	 * @param {String} token
	 * @returns {Object}
	 */
	static async Create(formData, token) {
		var result = null;
		try {
			const res = await this.Post('/Nav/Create/', token, formData);
			const body = await res.json();
			//console.log(body);
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
			const res = await this.Delete(`/Nav/Delete/${id}`, token);
			const body = await res.json();
			//console.log(body);
			if (body.error) {
				result = body;
			} else {
				result = body.result;
			}
		} catch (e) {
			console.log(e);
		}
		return result;
	}
}
