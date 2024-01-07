export function pushStateWithEvent(state, title, url) {
	var pushChangeEvent = new CustomEvent('onpushstate', {
		detail: {
			state,
			title,
			url,
		},
	});
	document.dispatchEvent(pushChangeEvent);
	return window.history.pushState(state, title, url);
}
