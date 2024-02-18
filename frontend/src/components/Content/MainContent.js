import { useCallback, useEffect, useState } from 'react';
import { LocationContext } from '../../Contexts';
import LocationData from '../../Models/LocationData';
import DetailPage from '../../Pages/DetailPage';
import HomePage from '../../Pages/HomePage';
import navService from '../../Services/navService';

export default function MainContent() {
	const [locationData, setLocationData] = useState(new LocationData());

	const onNavigation = useCallback(
		(e = {}) => {
			const newLocation = (
				e.detail?.url ? e.detail?.url : window.location.pathname
			).replace('/', '');

			if (locationData.Url !== newLocation) {
				//console.log(newLocation);
				if (newLocation) {
					navService
						.GetByUrl(newLocation) /*No loading*/
						.then((locationData) => {
							if (locationData.NavId) {
								setLocationData(locationData);
							}
						});
				} else {
					setLocationData(new LocationData());
				}
			}
		},
		[locationData]
	);

	useEffect(() => {
		document.addEventListener('pushstate', onNavigation);
		window.addEventListener('popstate', onNavigation);

		if (!locationData.Url && window.location.pathname) {
			onNavigation();
		}

		return function cleanup() {
			document.removeEventListener('pushstate', onNavigation);
			window.removeEventListener('popstate', onNavigation);
		};
	}, [locationData, onNavigation]);

	return (
		<LocationContext.Provider value={{ locationData, setLocationData }}>
			{window.location.pathname.replace('/', '') ? (
				<DetailPage />
			) : (
				<HomePage />
			)}
		</LocationContext.Provider>
	);
}
