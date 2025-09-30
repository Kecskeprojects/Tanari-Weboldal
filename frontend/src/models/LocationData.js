export default class LocationData {
	constructor(location) {
		if (location) {
			this.NavId = location.NavId;
			this.Url = location.Url;
			this.Name = location.Name;
			this.Label = location.Label;
			return;
		}
		this.NavId = '';
		this.Url = '';
		this.Name = '';
		this.Label = '';
	}
}
