export default class CurrentNavResource {
	constructor(nav) {
		if (nav) {
			(this.NavId = nav.NavId),
				(this.Url = nav.Url),
				(this.Name = nav.Name),
				(this.Label = CurrentNavResource.getLabel(nav));
		}
	}

	static getLabel(nav) {
		let label = nav.Name;
		let currNav = nav;

		while (currNav?.Nav) {
			currNav = currNav.Nav;
			label = currNav.Name + ' → ' + label;
		}

		return label;
	}
}
