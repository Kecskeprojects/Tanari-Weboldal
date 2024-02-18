import localStorageHelper from '../Helpers/localStorageHelper';

export default class BaseService {
	/**
	 * @param {String} route
	 */
	static async Get(route, additionalHeaders = {}) {
		return fetch(`${process.env.REACT_APP_BACKEND_URL}${route}`, {
			method: 'GET',
			headers: new Headers({
				...additionalHeaders,
			}),
		});
	}

	/**
	 * @param {String} route
	 * @param {String} token
	 */
	static async Post(route, token, body = {}, additionalHeaders = {}) {
		return fetch(`${process.env.REACT_APP_BACKEND_URL}${route}`, {
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

	/**
	 * @param {String} route
	 * @param {String} token
	 */
	static async Put(route, token = '', body = {}, additionalHeaders = {}) {
		return fetch(`${process.env.REACT_APP_BACKEND_URL}${route}`, {
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

	/**
	 * @param {String} route
	 * @param {String} token
	 */
	static async Delete(route, token, body = {}, additionalHeaders = {}) {
		return fetch(`${process.env.REACT_APP_BACKEND_URL}${route}`, {
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

	/**
	 * @param {String} route
	 * @param {String} username
	 */
	static async BaseLogin(route, username) {
		return fetch(`${process.env.REACT_APP_BACKEND_URL}${route}`, {
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
