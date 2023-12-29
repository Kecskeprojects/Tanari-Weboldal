import { useState, useEffect } from 'react';
import MainHeader from './components/MainHeader';
import './css/App.css';
import MainContent from './components/MainContent';
import localStorageHelper from './Helpers/localStorageHelper';
import UserData from './models/UserData';
import MainNavBar from './components/MainNavBar';
import MainFooter from './components/MainFooter';

export default function App() {
	const [userData, setUserData] = useState(new UserData());
	const [pushListenerAttached, setPushListenerAttached] = useState(false);
	
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
	}, [userData])

	return (
		<div className="container-box">
			<MainHeader
				setUser={setUserData.bind(this)}
				isLoggedIn={userData.isLoggedIn()}
			/>
			<MainNavBar />
			<MainContent 
				pushListenerAttached={pushListenerAttached}
				setPushListenerAttached={setPushListenerAttached.bind(this)}
				userData={userData}
			/>
			<MainFooter />
		</div>
	);
}
