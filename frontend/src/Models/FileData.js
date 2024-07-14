export default class FileData {
	FileId = 0;
	Name = 'unknown';
	Extension = 'txt';
	constructor(item) {
		if (item) {
			this.FileId = item.FileId;
			this.Name = item.Name;
			this.Extension = item.Extension;
		}
	}
}
