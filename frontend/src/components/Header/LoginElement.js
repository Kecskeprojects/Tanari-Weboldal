import { faCircleNotch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts';
import localStorageHelper from '../../Helpers/localStorageHelper';
import UserData from '../../Models/UserData';
import UserService from '../../Services/userService';

//Todo: Rewrite this so that it is an icon that opens up a popup below the icon, if it is hovered or focused
export default function LoginElement() {
	const [loading, setLoading] = useState(false);

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
			setLoading(false);
		});
		setLoading(true);
	};

	function renderLoginInputs() {
		return (
			<>
				<label
					htmlFor='username'
					hidden={true}
				>
					Username
				</label>
				<input
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
						type='button'
						onClick={(e) => onLogin(e)}
					>
						Belépés
					</button>
				)}
			</>
		);
	}

	return (
		<div className='login-container'>
			<FontAwesomeIcon
				className='user-icon'
				icon={faUser}
				size='xl'
			/>

			<div className='login-inner'>
				{!context.userData.isLoggedIn() ? (
					renderLoginInputs()
				) : (
					<button
						type='button'
						onClick={(e) => onLogOut(e)}
					>
						Kilépés
					</button>
				)}
			</div>
		</div>
	);
}
