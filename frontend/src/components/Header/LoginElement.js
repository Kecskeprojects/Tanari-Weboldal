import { useContext } from 'react';
import UserService from '../../Services/userService';
import localStorageHelper from '../../Helpers/localStorageHelper';
import UserData from '../../Models/UserData';
import { UserContext } from '../../Contexts';

export default function LoginElement() {
	const context = useContext(UserContext);

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

	const onLogOut = (e) => {
		localStorageHelper.removeUser();
		context.setUserData(new UserData());
	};

	const Login = (username) => {
		UserService.Login(username).then((userData) => {
			context.setUserData(userData);
		});
	};

	return !context.userData.isLoggedIn() ? (
		<div>
			<label
				htmlFor='username'
				hidden={true}
			>
				Username
			</label>
			<input
				className='me-2'
				type='password'
				id='username'
				autoComplete='username'
				onKeyUp={(e) => handleEnter(e)}
				aria-label='Username'
				title='Username'
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
	);
}
