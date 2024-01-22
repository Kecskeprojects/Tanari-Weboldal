import '../../css/Header.css';
import HomeLink from './HomeLink';
import LoginElement from './LoginElement';

export default function MainHeader() {
	return (
		<header style={{ backgroundImage: 'url(./img/header-img.jpg)' }}>
			<HomeLink />
			{/*Todo: Place a new button here for adding new nav elements, It should only appear if user is logged in*/}
			<LoginElement />
		</header>
	);
}
