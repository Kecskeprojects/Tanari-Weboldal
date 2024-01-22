export function pushStateWithEvent(event, state, title, url) {
	event.preventDefault();
	const pushChangeEvent = new CustomEvent('pushstate', {
		detail: {
			state,
			title,
			url,
		},
	});
	document.dispatchEvent(pushChangeEvent);
	return window.history.pushState(state, title, url);
}

const listeners = [];

export function setNavigationListeners(onNavigation) {
	//Removing past listeners as the function updates on every render
	for (let ind = 0; ind < listeners.length; ind++) {
		document.removeEventListener('pushstate', listeners[ind]);
		window.removeEventListener('popstate', listeners[ind]);
	}

	listeners.splice(0, listeners.length);

	document.addEventListener('pushstate', onNavigation);
	window.addEventListener('popstate', onNavigation);

	listeners.push(onNavigation);
}
