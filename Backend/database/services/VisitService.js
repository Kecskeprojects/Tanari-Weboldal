import ResponseWithInfo from '../../communication/ResponseWithInfo.js';
import VisitRepository from '../repositories/VisitRepository.js';

export default class VisitService {
	static async get() {
		const list = await VisitRepository.get();
		return new ResponseWithInfo(list);
	}

	static async update() {
		const visits = await VisitRepository.getVisitItem();
		if (!visits) {
			return new ResponseWithInfo([], 'Visitor count not found');
		}

		const result = await VisitRepository.update({
			VisitCount: visits.VisitCount + 1n,
			ModifiedOn: new Date(),
		});
		return new ResponseWithInfo(result);
	}
}
