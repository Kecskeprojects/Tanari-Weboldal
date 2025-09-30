export default class LinkPopupDetail {
	static title = 'Link hozzáadás';
	static inputs = [
		{
			name: 'url',
			type: 'text',
			label: 'útvonal/teljes link',
			description: `Az útvonal ahová a link át fog irányítani<br/>
				példák:<br/>
					'https://www.google.com'<br/>
					'youtube.com'<br/>
					'tananyagok' (ez valójában ide irányít át: "www.feladatkert.hu/tananyagok")`,
		},
		{
			name: 'title',
			type: 'text',
			label: 'Megjelenített szöveg',
			description: `Ez jelenik meg a felületen a link helyett<br/>
				például ha a link 'https://www.google.com', a Megjelenített szöveg pedig 'Google', akkor csak a 'Google' szöveg fog látszani`,
		},
		{
			name: 'openNewTab',
			type: 'checkbox',
			label: 'A link új lapot nyisson?',
			description:
				'alap esetben a jelenlegi lapot fogja átirányítani a linkre',
		},
	];
	static buttonLabel = 'Hozzáadás';
}
