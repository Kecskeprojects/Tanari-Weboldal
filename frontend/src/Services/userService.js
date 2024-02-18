import localStorageHelper from '../Helpers/localStorageHelper';
import UserData from '../Models/UserData';
import BaseService from './BaseService';

export default class UserService extends BaseService {
	/**
	 * @param {String} username
	 */
	static async Login(username) {
		var userData = new UserData();
		try {
			const res = await this.BaseLogin('/User/Login', username);
			const body = await res.json();
			//console.log(body);
			if (!body?.error) {
				localStorageHelper.setUser(JSON.stringify(body));
				userData = new UserData(body);
			} else {
				window.alert(body.error);
			}
		} catch (e) {
			console.log(e);
		}

		return userData;
	}
}
