export default class localStorageHelper {
	static USER_KEY = 'user';

	/**
	 * @param {Object} user
	 */
	static setUser(user) {
		localStorage.setItem(this.USER_KEY, user);
	}

	/**
	 * @returns {Object}
	 */
	static getUser() {
		return localStorage.getItem(this.USER_KEY);
	}

	static removeUser() {
		localStorage.removeItem(this.USER_KEY);
	}

	/**
	 * @returns {Boolean}
	 */
	static isLoggedIn() {
		return !!this.getUser();
	}
}
