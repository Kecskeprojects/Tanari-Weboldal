import { useEffect, useState } from 'react';
import navService from '../Services/navService';
import { pushStateWithEvent } from '../Helpers/pushStateHelper';

export default function MainNavBar() {
	const [navJSON, setNavJSON] = useState(null);

	useEffect(() => {
		if (!navJSON) {
			navService
				.GetAllForNavbar()
				.then((res) => res.json())
				.then((nav) => {
					if (nav) {
						//console.log(nav);
						setNavJSON(nav['0']);
					}
				})
				.catch((error) => console.log(error));
		}
	}, [navJSON]);

	function onNavClick(e, title, url) {
		e.preventDefault();
		pushStateWithEvent(null, title, url);
	}

	function mapNavBarElements() {
		if (!navJSON || navJSON.length === 0) {
			return null;
		}
		return navJSON.map((x, ind) =>
			x.other_nav.length > 0 ? (
				<li
					className='dropdown'
					key={x.Name + ind}
				>
					<a
						className='nav-link dropdown-toggle'
						href={x.Url}
						onClick={(e) => onNavClick(e, x.Name, x.Url)}
					>
						{x.Name}
					</a>
					{mapNavBarElementsInner(x.other_nav)}
				</li>
			) : (
				<li key={x.Name + ind}>
					<a
						className='nav-link'
						href={x.Url}
						onClick={(e) => onNavClick(e, x.Name, x.Url)}
					>
						{x.Name}
					</a>
				</li>
			)
		);
	}

	function mapNavBarElementsInner(inner_list) {
		return (
			<div className='relative-container'>
				<ul className='dropdown-menu'>
					{inner_list.map((x, ind) =>
						x.other_nav.length > 0 ? (
							<li
								className='dropdown-submenu'
								key={x.Name + ind}
							>
								<a
									className='dropdown-item dropdown-toggle'
									href={x.Url}
									onClick={(e) =>
										onNavClick(e, x.Name, x.Url)
									}
								>
									{x.Name}
								</a>
								{mapNavBarElementsInner(x.other_nav)}
							</li>
						) : (
							<li key={x.Name + ind}>
								<a
									className='dropdown-item'
									href={x.Url}
									onClick={(e) =>
										onNavClick(e, x.Name, x.Url)
									}
								>
									{x.Name}
								</a>
							</li>
						)
					)}
				</ul>
			</div>
		);
	}

	return (
		<div className='nav-container'>
			<ul className='navbar-nav'>{mapNavBarElements()}</ul>
		</div>
	);
}
