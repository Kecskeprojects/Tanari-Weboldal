import { useState, useEffect } from 'react';
import MainHeader from './components/Header/MainHeader';
import './css/App.css';
import MainContent from './components/Content/MainContent';
import localStorageHelper from './Helpers/localStorageHelper';
import UserData from './Models/UserData';
import MainNavBar from './components/Nav/MainNavBar';
import MainFooter from './components/Footer/MainFooter';
import { UserContext } from './Contexts';
import visitService from './Services/visitService';

export default function App() {
	const [userData, setUserData] = useState(new UserData());

	useEffect(() => {
		//Load user from local storage if it exists and nothing is currently stored in state
		if (localStorageHelper.isLoggedIn()) {
			if (userData.isEmpty()) {
				const cachedUser = JSON.parse(localStorageHelper.getUser());
				setUserData(new UserData(cachedUser));
				return;
			}

			//Empty local storage if login expired
			if (!userData.isLoggedIn()) {
				localStorageHelper.removeUser();
				setUserData(new UserData());
				return;
			}
		}
	}, [userData]);

	//Todo: Implement loading screens where any sort of backend call happens
	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<div
				className='container-box'
				onLoad={(e) => visitService.Update()}
			>
				<MainHeader />
				<MainNavBar />
				<MainContent />
				<MainFooter />
			</div>
		</UserContext.Provider>
	);
}
