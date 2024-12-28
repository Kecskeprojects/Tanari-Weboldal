import ResponseWithInfo from '../../communication/ResponseWithInfo.js';
import NavRepository from '../repositories/NavRepository.js';

export default class NavService {
	static async getAllForNav() {
		const list = await NavRepository.getAllForNav();
		return new ResponseWithInfo(list);
	}

	static async getByUrl(url) {
		if (!url) {
			return new ResponseWithInfo(
				[],
				'No page data was received for search'
			);
		}

		const nav = await NavRepository.getByUrl({ Url: url });
		return new ResponseWithInfo(nav);
	}

	static async create(parentNavUrl, name, url) {
		if (!parentNavUrl) {
			return new ResponseWithInfo(
				[],
				'No page data was received for creation'
			);
		}
		var nav = await NavRepository.getById({ Url: parentNavUrl });

		const result = await NavRepository.create({
			ParentNavId: nav?.NavId,
			Name: name,
			Url: url,
			CreatedOn: new Date(),
		});
		return new ResponseWithInfo(result);
	}

	static async delete(navIdString) {
		const navId = parseInt(navIdString);
		if (!navId || Number.isNaN(navId)) {
			return new ResponseWithInfo([], 'Id is not a number');
		}

		const result = await NavRepository.delete({ NavId: navId });
		return new ResponseWithInfo(result);
	}
}
