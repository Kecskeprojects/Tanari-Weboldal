export default class FilePopupDetail {
	static title = 'Fájl hozzáadás';
	static inputs = [
		{
			name: 'mainfile',
			type: 'file',
			description: 'A fájl neve lesz a felületen megjelenített név is',
		},
	];
	static buttonLabel = 'Fájl Feltöltés';
}
