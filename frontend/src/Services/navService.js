import BaseService from './BaseService';

export default class navService extends BaseService {
	static async GetAllForNavbar() {
		var navList = null;
		try {
			const route = `${process.env.REACT_APP_BACKEND_URL}/Nav/GetAllForNavbar/`;

			const res = await this.Get(route);
			const body = await res.json();
			//console.log(body);
			navList = body[0];
		} catch (e) {
			console.log(e);
		}
		return navList;
	}

	static async GetAll() {
		var navList = null;
		try {
			const route = `${process.env.REACT_APP_BACKEND_URL}/Nav/GetAll/`;

			const res = await this.Get(route);
			const body = await res.json();
			//console.log(body);
			navList = body[0];
		} catch (e) {
			console.log(e);
		}
		return navList;
	}

	static async Create(formData, token) {
		const route = `${process.env.REACT_APP_BACKEND_URL}/Nav/Create/`;
		return fetch(route, {
			body: formData,
			method: 'POST',
			headers: new Headers({
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			}),
		});
	}

	static async Delete(id, token) {
		const route = `${process.env.REACT_APP_BACKEND_URL}/Nav/Delete/${id}`;
		return fetch(route, {
			method: 'DELETE',
			headers: new Headers({ Authorization: `Bearer ${token}` }),
		});
	}
}
