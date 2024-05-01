import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts';
import localStorageHelper from '../../Helpers/localStorageHelper';
import UserData from '../../Models/UserData';
import UserService from '../../Services/userService';

export default function LoginElement() {
	const [loading, setLoading] = useState(false);

	const context = useContext(UserContext);
	//Todo: Add a search input that, if interacted with, changes the page to a searchPage with results
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
			setLoading(false);
		});
		setLoading(true);
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
			{loading ? (
				<span className='login-loading'>
					<FontAwesomeIcon
						icon={faCircleNotch}
						spin={true}
					/>
				</span>
			) : (
				<button
					className='me-2'
					type='button'
					onClick={(e) => onLogin(e)}
				>
					Belépés
				</button>
			)}
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
