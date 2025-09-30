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
			return new ResponseWithInfo([], 'Ismeretlen felhasználó');
		}

		const uuid = crypto.randomUUID();
		const token = jwt.sign({ id: uuid }, process.env.SECRET, {
			expiresIn: '7d',
		});
		return new ResponseWithInfo({
			accessToken: token,
			id: uuid,
			expiresOn: DateHelper.addDays(new Date(), 7),
		});
	}
}
