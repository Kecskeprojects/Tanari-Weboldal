import { createContext } from 'react';
import LocationData from './Models/LocationData';
import UserData from './Models/UserData';

export const UserContext = createContext({
	userData: new UserData(),
	setUserData: (newUser = new UserData()) => {},
});

export const LocationContext = createContext({
	locationData: new LocationData(),
	setLocationData: (newLocation = new LocationData()) => {},
});

export const SearchContext = createContext({
	searchKeyword: '',
	setSearchKeyword: (newKeyword = '') => {},
});
