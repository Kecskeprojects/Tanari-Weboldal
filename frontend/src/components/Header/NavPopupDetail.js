export default class NavPopupDetail {
	static title = 'Navigáció hozzáadás';
	static description =
		'Ez a navigáció az aktuális menüpont alatt fog készülni, ha ez a főoldal, akkor egy új fő menüpont fog készülni';
	static inputs = [
		{
			name: 'url',
			type: 'text',
			label: 'útvonal/teljes link',
			description: `Az útvonal ahová a navigációs gomb át fog irányítani<br/>
				példák:<br/>
					'https://www.google.com'<br/>
					'youtube.com'<br/>
					'tananyagok' (ez valójában ide irányít át: "www.feladatkert.hu/tananyagok")`,
		},
		{
			name: 'name',
			type: 'text',
			label: 'Megjelenített szöveg',
			description: `Ez jelenik meg a navigációs részben a link helyett<br/>
				például ha a link 'https://www.google.com', a Megjelenített szöveg pedig 'Google', akkor csak a 'Google' szöveg fog látszani`,
		},
	];
	static buttonLabel = 'Navigáció hozzáadása';
}
