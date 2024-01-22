import { useEffect, useState } from 'react';
import '../css/Nav.css';
import navService from '../Services/navService';
import NavButton from './NavButton';

export default function MainNavBar({ userData = {} }) {
	const [navJSON, setNavJSON] = useState(null);

	useEffect(() => {
		navService.GetAllForNavbar().then((nav) => {
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
								userData={userData}
							/>
					  ))
					: null}
			</ul>
		</div>
	);
}
