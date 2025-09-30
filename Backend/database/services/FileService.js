import ResponseWithInfo from '../../communication/ResponseWithInfo.js';
import FileRepository from '../repositories/FileRepository.js';

export default class FileService {
	static async getAll(navIdString) {
		const navId = parseInt(navIdString);
		if (!navId || Number.isNaN(navId)) {
			return new ResponseWithInfo([], 'Id is not a number');
		}

		const list = await FileRepository.getAll({ NavId: navId });
		return new ResponseWithInfo(list);
	}

	static async getRecent() {
		const list = await FileRepository.getRecent();
		return new ResponseWithInfo(list);
	}

	static async getBySearchResult(keyword) {
		if (!keyword) {
			return new ResponseWithInfo(
				[],
				'Kulcsszó nélkül nem lehet keresni'
			);
		}

		const list = await FileRepository.getBySearchResult({
			OR: [
				{ Name: { contains: keyword } },
				{ Extension: { contains: keyword } },
			],
		});
		return new ResponseWithInfo(list);
	}

	static async getById(fileIdString) {
		const fileId = parseInt(fileIdString);
		if (!fileId || Number.isNaN(fileId)) {
			return new ResponseWithInfo([], 'Id is not a number');
		}

		const file = await FileRepository.getById({ FileId: fileId });
		return new ResponseWithInfo(file);
	}

	static async create(file, navIdString) {
		if (!file) {
			return new ResponseWithInfo([], 'No files attached');
		}

		const navId = parseInt(navIdString);
		if (!navId || Number.isNaN(navId)) {
			return new ResponseWithInfo([], 'Id is not a number');
		}

		const fileNameParts = file.name.split('.');

		if (fileNameParts.length === 0) {
			return new ResponseWithInfo([], 'File name is empty/incorrect');
		}

		var extension = '';
		if (fileNameParts.length > 1) {
			extension = fileNameParts[fileNameParts.length - 1];
		}
		const name = file.name.replace('.' + extension, '');

		const result = await FileRepository.create({
			Content: file.data,
			Name: name,
			Extension: extension,
			NavId: navId,
			CreatedOn: new Date(),
		});
		return new ResponseWithInfo(result);
	}

	static async delete(fileIdString) {
		const fileId = parseInt(fileIdString);
		if (!fileId || Number.isNaN(fileId)) {
			return new ResponseWithInfo([], 'Id is not a number');
		}

		const result = await FileRepository.delete({ FileId: fileId });
		return new ResponseWithInfo(result);
	}
}
