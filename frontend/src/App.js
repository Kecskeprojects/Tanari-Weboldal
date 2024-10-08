import { useEffect, useState } from 'react';
import { UserContext } from './Contexts';
import localStorageHelper from './Helpers/localStorageHelper';
import UserData from './Models/UserData';
import visitService from './Services/visitService';
import MainContent from './components/Content/MainContent';
import MainFooter from './components/Footer/MainFooter';
import MainHeader from './components/Header/MainHeader';
import MainNavBar from './components/Nav/MainNavBar';
import './css/App.css';

//Todo: Make db folder like in work project and separate the TanariDB.sql script into tables, with one base-install script to run all the files
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

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<div
				className='container-box'
				onLoad={(e) => visitService.Update() /*No loading*/}
			>
				<MainHeader />
				<MainNavBar />
				<MainContent />
				<MainFooter />
			</div>
		</UserContext.Provider>
	);
}
