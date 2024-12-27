import { useContext } from 'react';
import { SearchContext } from '../../Contexts';
import { pushStateWithEvent } from '../../Helpers/pushStateHelper';

export default function HomeLink() {
	const context = useContext(SearchContext);

	function navigateHome(e) {
		context.setSearchKeyword('');
		pushStateWithEvent(e, null, 'Home', '/');
	}

	return (
		<a
			className='main-link ms-4'
			href='/'
			onClick={navigateHome}
		>
			<img
				className='me-2'
				src='https://placehold.co/64' //Todo: Switch out with proper file
				alt='profile'
				width='64'
				height='64'
			/>
			Főoldal
		</a>
	);
}
