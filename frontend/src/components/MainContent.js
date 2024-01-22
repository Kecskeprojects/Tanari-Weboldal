import { useCallback, useEffect, useState } from 'react';
import DetailPage from '../pages/DetailPage';
import HomePage from '../pages/HomePage';
import { setNavigationListeners } from '../Helpers/pushStateHelper';
import navService from '../Services/navService';
import { LocationContext } from '../Contexts';
import LocationData from '../models/LocationData';

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
					navService.GetByUrl(newLocation).then((locationData) => {
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
		setNavigationListeners(onNavigation);

		if (!locationData.Url && window.location.pathname) {
			onNavigation();
		}
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
