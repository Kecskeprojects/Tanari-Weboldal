import ResponseWithInfo from '../../communication/ResponseWithInfo.js';
import LinkRepository from '../repositories/LinkRepository.js';

export default class LinkService {
	static async getAll(navIdString) {
		const navId = parseInt(navIdString);
		if (!navId || Number.isNaN(navId)) {
			return new ResponseWithInfo([], 'Id is not a number');
		}

		const list = await LinkRepository.getAll({ NavId: navId });
		return new ResponseWithInfo(list);
	}

	static async getRecent() {
		const list = await LinkRepository.getRecent();
		return new ResponseWithInfo(list);
	}

	static async getBySearchResult(keyword) {
		if (!keyword) {
			return new ResponseWithInfo(
				[],
				'Kulcsszó nélkül nem lehet keresni'
			);
		}

		const list = await LinkRepository.getBySearchResult({
			OR: [
				{ Url: { contains: keyword } },
				{ Title: { contains: keyword } },
			],
		});
		return new ResponseWithInfo(list);
	}

	static async create(navIdString, url, title, openNewTab) {
		const navId = parseInt(navIdString);
		if (!navId || Number.isNaN(navId)) {
			return new ResponseWithInfo([], 'Id is not a number');
		}

		const result = await LinkRepository.create({
			Url: url,
			Title: title,
			OpenNewTab: openNewTab === 'true',
			NavId: navId,
			CreatedOn: new Date(),
		});
		return new ResponseWithInfo(result);
	}

	static async delete(linkIdString) {
		const linkId = parseInt(linkIdString);
		if (!linkId || Number.isNaN(linkId)) {
			return new ResponseWithInfo([], 'Id is not a number');
		}

		const result = await LinkRepository.delete({ LinkId: linkId });
		return new ResponseWithInfo(result);
	}
}
