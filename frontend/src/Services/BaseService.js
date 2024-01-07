import localStorageHelper from '../Helpers/localStorageHelper';

export default class BaseService {
	static async Get(route, additionalHeaders = {}) {
		return fetch(route, {
			method: 'GET',
			headers: new Headers({
				...additionalHeaders,
			}),
		});
	}

	static async Post(route, token, body = {}, additionalHeaders = {}) {
		return fetch(route, {
			body: body,
			method: 'POST',
			headers: new Headers({
				...additionalHeaders,
				Authorization: `Bearer ${token}`,
			}),
		}).then((res) => {
			if (res.status === 401) {
				localStorageHelper.removeUser();
			}
			return res;
		});
	}

	static async Put(route, token, body = {}, additionalHeaders = {}) {
		return fetch(route, {
			body: body,
			method: 'PUT',
			headers: new Headers({
				...additionalHeaders,
				Authorization: `Bearer ${token}`,
			}),
		}).then((res) => {
			if (res.status === 401) {
				localStorageHelper.removeUser();
			}
			return res;
		});
	}

	static async Delete(route, token, body = {}, additionalHeaders = {}) {
		return fetch(route, {
			body: body,
			method: 'DELETE',
			headers: new Headers({
				...additionalHeaders,
				Authorization: `Bearer ${token}`,
			}),
		}).then((res) => {
			if (res.status === 401) {
				localStorageHelper.removeUser();
			}
			return res;
		});
	}

	static async BaseLogin(route, username) {
		return fetch(route, {
			body: JSON.stringify({ username: username }),
			method: 'POST',
			headers: new Headers({ 'content-type': 'application/json' }),
		}).then((res) => {
			if (res.status === 401) {
				localStorageHelper.removeUser();
			}
			return res;
		});
	}
}
