import ResponseWithInfo from '../../communication/ResponseWithInfo.js';
import CurrentNavResource from '../../resources/CurrentNavResource.js';
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
		const navResource = new CurrentNavResource(nav);
		return new ResponseWithInfo(navResource);
	}

	static async create(parentNavUrl, name, url) {
		//internal navigation is not supposed to have dots
		if (!url.includes('.')) {
			var navExists = await NavRepository.getById({ Url: url ?? null });

			if (navExists) {
				return new ResponseWithInfo(
					[],
					'Már létezik navigáció ezzel az elérési úttal a Feladatkerten belül'
				);
			}
		}

		var nav = await NavRepository.getById({ Url: parentNavUrl ?? null });

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
