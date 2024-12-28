import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ResponseWithInfo from '../../communication/ResponseWithInfo.js';
import DateHelper from '../../helpers/DateHelper.js';

export default class UserService {
	static login(username) {
		const userMatches = bcrypt.compareSync(
			username,
			process.env.ENCRYPTED_USERNAME //Todo: Create a more complex login name
		);
		if (!userMatches) {
			return new ResponseWithInfo([], 'Incorrect user');
		}

		const uuid = crypto.randomUUID();
		const token = jwt.sign({ id: uuid }, process.env.SECRET, {
			expiresIn: '7d',
		}); //Todo: Create a more complex Secret Key
		return new ResponseWithInfo({
			accessToken: token,
			id: uuid,
			expiresOn: DateHelper.addDays(new Date(), 7),
		});
	}
}
