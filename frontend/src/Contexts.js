import { createContext } from 'react';
import UserData from './Models/UserData';
import LocationData from './Models/LocationData';

export const UserContext = createContext({
	userData: new UserData(),
	setUserData: (newUser = new UserData()) => {},
});

export const LocationContext = createContext({
	locationData: new LocationData(),
	setLocationData: (newLocation = new LocationData()) => {},
});
