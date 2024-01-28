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
