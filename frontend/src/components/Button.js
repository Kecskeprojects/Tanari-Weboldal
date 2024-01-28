import { useContext } from 'react';
import { UserContext } from '../Contexts';

export default function Button({
	label = null,
	onClickFunction = (e) => {},
	className = '',
}) {
	const context = useContext(UserContext);

	return context.userData.isLoggedIn() ? (
		<button
			type='button'
			onClick={onClickFunction}
			className={'create-button ' + className}
		>
			{label}
		</button>
	) : null;
}
