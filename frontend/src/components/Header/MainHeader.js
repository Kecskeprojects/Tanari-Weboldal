import '../../css/Header.css';
import HomeLink from './HomeLink';
import LoginElement from './LoginElement';
import SearchComponent from './SearchComponent';

export default function MainHeader() {
	return (
		<header style={{ backgroundImage: 'url(./img/header-img.webp)' }}>
			<HomeLink />
			<div className='text-end'>
				<SearchComponent />
				<LoginElement />
			</div>
		</header>
	);
}
