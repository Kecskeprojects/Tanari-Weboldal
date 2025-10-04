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
			className='main-link'
			href='/'
			onClick={navigateHome}
		>
			<img
				src='.\img\logo64.png'
				alt='profile'
				width='64'
				height='64'
			/>
			<span className='main-link-text'>Feladatkert</span>
		</a>
	);
}
