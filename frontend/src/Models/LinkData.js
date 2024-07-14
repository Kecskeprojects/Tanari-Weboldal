export default class LinkData {
	LinkId = 0;
	Url = 'unknown';
	Title = 'txt';
	OpenNewTab = false;

	constructor(item) {
		if (item) {
			this.LinkId = item.LinkId;
			this.Url = item.Url;
			this.Title = item.Title;
			this.OpenNewTab = item.OpenNewTab;
		}
	}
}
