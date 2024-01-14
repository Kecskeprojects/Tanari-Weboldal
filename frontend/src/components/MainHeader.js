import { useCallback } from 'react';
import '../css/Header.css';
import UserService from '../Services/userService';
import localStorageHelper from '../Helpers/localStorageHelper';
import UserData from '../models/UserData';

export default function MainHeader({ setUser = () => {}, isLoggedIn = false }) {
	const handleEnter = (e) => {
		//13 is the key code for Enter
		if (e.keyCode === 13) {
			Login(e.target.value);
		}
	};

	const onLogin = (e) => {
		const username = document.getElementById('username')?.value;
		Login(username);
	};

	const onLogOut = useCallback(
		(e) => {
			localStorageHelper.removeUser();
			setUser(new UserData());
		},
		[setUser]
	);

	const Login = useCallback(
		(username) => {
			UserService.Login(username).then((userData) => {
				setUser(userData);
			});
		},
		[setUser]
	);

	return (
		<header style={{ backgroundImage: 'url(./img/header-img.jpg)' }}>
			<a
				href='/'
				className='main-link ms-4'
			>
				<img
					className='me-2'
					src='https://placehold.co/64'
					alt='profile'
					width='64'
					height='64'
				/>
				Főoldal
			</a>
			{/*Todo: Place a new button here for adding new nav elements*/}
			{!isLoggedIn ? (
				<div>
					<input
						className='me-2'
						type='password'
						id='username'
						onKeyUp={(e) => handleEnter(e)}
					/>
					<button
						className='me-2'
						type='button'
						onClick={(e) => onLogin(e)}
					>
						Belépés
					</button>
				</div>
			) : (
				<button
					className='me-2'
					type='button'
					onClick={(e) => onLogOut(e)}
				>
					Kilépés
				</button>
			)}
		</header>
	);
}
