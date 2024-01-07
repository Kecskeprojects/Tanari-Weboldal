import localStorageHelper from '../Helpers/localStorageHelper';
import UserData from '../models/UserData';
import BaseService from './BaseService';

export default class UserService extends BaseService {
	static async Login(username) {
		var userData = new UserData();
		try {
			const route = `${process.env.REACT_APP_BACKEND_URL}/User/Login`;

			const res = await this.BaseLogin(route, username);
			const body = await res.json();
			//console.log(body);
			localStorageHelper.setUser(JSON.stringify(body));
			userData = new UserData(body);
		} catch (e) {
			console.log(e);
		}

		return userData;
	}
}
