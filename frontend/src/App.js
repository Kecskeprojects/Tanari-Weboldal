import { useState, useEffect } from 'react';
import MainHeader from './components/MainHeader';
import './css/App.css';
import MainContent from './components/MainContent';
import authService from './Services/authService';
import UserData from './models/UserData';

export default function App() {
	const [userData, setUserData] = useState(new UserData());

	useEffect(() => {
		//Load user from local storage if it exists and nothing is currently stored in state
		if(authService.isLoggedIn()){
			if (userData.isEmpty()) {
				const cachedUser = JSON.parse(authService.getUser());
				setUserData(new UserData(cachedUser));
				return;
			}
	
			//Empty local storage if login expired
			if(!userData.isLoggedIn()){
				authService.removeUser();
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
			<MainContent/>
		</div>
	);
}
