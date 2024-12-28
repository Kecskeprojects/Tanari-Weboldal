import LinkData from '../Models/LinkData';
import BaseService from './BaseService';

export default class linkService extends BaseService {
	/**
	 * @param {Number} navId
	 * @returns {Promise<LinkData[]>}
	 */
	static async GetAll(navId) {
		var linkList = null;
		try {
			var route = '/Link/GetAll/';
			if (navId) {
				route += `?navId=${navId}`;
			}
			const res = await this.Get(route);
			const body = await res.json();

			if (process.env.NODE_ENV !== 'production') {
				console.log(body);
			}

			linkList = linkService.MapItems(body);
		} catch (e) {
			console.log(e);
		}
		return linkList;
	}

	/**
	 * @returns {Promise<LinkData[]>}
	 */
	static async GetRecent() {
		var linkList = null;
		try {
			const res = await this.Get('/Link/GetRecent/');
			const body = await res.json();

			if (process.env.NODE_ENV !== 'production') {
				console.log(body);
			}

			linkList = linkService.MapItems(body);
		} catch (e) {
			console.log(e);
		}
		return linkList;
	}

	/**
	 * @returns {Promise<LinkData[]>}
	 */
	static async GetBySearchResult(keyword) {
		var linkList = null;
		try {
			const keywordEscaped = JSON.stringify(keyword).slice(1, -1);
			const res = await this.Get(
				`/Link/GetBySearchResult/?keyword=${keywordEscaped}`
			);
			const body = await res.json();

			if (process.env.NODE_ENV !== 'production') {
				console.log(body);
			}

			linkList = linkService.MapItems(body);
		} catch (e) {
			console.log(e);
		}
		return linkList;
	}

	/**
	 * @param {FormData} formData
	 * @param {String} token
	 * @returns {Object}
	 */
	static async Create(formData, token) {
		var result = null;
		try {
			const res = await this.Post('/Link/Create/', token, formData);
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
			const res = await this.Delete(`/Link/Delete/${id}`, token);
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
	 * @param {Array} itemList
	 * @returns {Array}
	 */
	static MapItems(itemList) {
		const items = [];
		itemList.forEach((element) => {
			items.push(new LinkData(element));
		});
		return items;
	}
}
