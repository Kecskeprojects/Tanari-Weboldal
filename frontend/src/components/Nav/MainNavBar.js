import { useEffect, useState } from 'react';
import navService from '../../Services/navService';
import '../../css/Nav.css';
import NavButton from './NavButton';

export default function MainNavBar() {
	const [navJSON, setNavJSON] = useState(null);

	useEffect(() => {
		navService
			.GetAllForNavbar() /*No loading*/
			.then((nav) => {
				setNavJSON(nav);
			});
	}, []);

	return (
		<div className='nav-container'>
			<ul className='navbar-nav'>
				{navJSON
					? navJSON.map((nav, index) => (
							<NavButton
								nav={nav}
								index={index}
								key={nav.Name + index}
							/>
					  ))
					: null}
			</ul>
		</div>
	);
}
