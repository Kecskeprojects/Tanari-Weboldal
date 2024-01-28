export default class LinkPopupDetail {
	static title = 'Link hozzáadás';
	static inputs = [
		{ name: 'url', type: 'text', label: 'útvonal/teljes link' },
		{ name: 'title', type: 'text', label: 'helyettesítő szöveg' },
		{ name: 'target', type: 'checkbox', label: 'új lapon?' },
	];
	static buttonLabel = 'Hozzáadás';
}
