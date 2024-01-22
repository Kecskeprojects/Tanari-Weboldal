import { useCallback, useEffect, useState } from 'react';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';

export default function MainContent({
	setNavigationListenersAttached = () => {},
	navigationListenersAttached = false,
	userData,
}) {
	const [locationData, setLocationData] = useState({
		location: window.location.pathname.replace('/', ''),
		locationName: '',
	});
	//Todo: reconsider if the navigation works this way or if there is an easier solution (useContext), clean up code more
	const observeUrlChange = useCallback(
		(e) => {
			const newLocation = window.location.pathname.replace('/', '');
			if (locationData.location !== newLocation) {
				setLocationData({ location: newLocation, locationName: '' });
			}
		},
		[locationData]
	);

	useEffect(() => {
		if (!navigationListenersAttached) {
			//Removing to avoid duplication, in the rare case that it may occur
			document.removeEventListener('onpushstate', onNavigation);
			document.addEventListener('onpushstate', onNavigation);

			window.removeEventListener('popstate', observeUrlChange);
			window.addEventListener('popstate', observeUrlChange);
			setNavigationListenersAttached(true);
		}
	}, [
		navigationListenersAttached,
		setNavigationListenersAttached,
		observeUrlChange,
	]);

	function onNavigation(e) {
		//console.log(e.detail);
		setLocationData({
			location: e.detail.url,
			locationName: e.detail.title,
		});
	}

	function refresh() {
		setLocationData({ ...locationData });
	}

	return locationData && locationData.location ? (
		<DetailPage
			locationData={locationData}
			refresh={refresh}
			userData={userData}
		/>
	) : (
		<HomePage />
	);
}
