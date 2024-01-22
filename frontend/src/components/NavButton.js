import { pushStateWithEvent } from '../Helpers/pushStateHelper';
import navService from '../Services/navService';
import DeleteIcon from './DeleteIcon';

export default function NavButton({
	nav = { Name: 'unknown', Url: 'unknown', other_nav: [] },
	index = 0,
	userData = {},
}) {
	function isDropdown(nav) {
		return nav.other_nav && nav.other_nav.length > 0;
	}

	function onNavClick(e, title, url) {
		e.preventDefault();
		pushStateWithEvent(null, title, url);
	}

	function renderButton(nav, index, isInner = false) {
		const dropdown = isDropdown(nav);
		return (
			<li
				className={
					dropdown ? (isInner ? 'dropdown-submenu' : 'dropdown') : ''
				}
				key={nav.Name + index}
			>
				<a
					className={
						(isInner ? 'dropdown-item' : 'nav-link') +
						(dropdown ? ' dropdown-toggle' : '')
					}
					href={nav.Url}
					onClick={(e) => onNavClick(e, nav.Name, nav.Url)}
				>
					<DeleteIcon
						onDeleteFunction={() =>
							navService.Remove(nav.NavId, userData.token)
						}
						show={userData.isLoggedIn()}
					/>
					{nav.Name}
				</a>
				{dropdown ? (
					<div className='relative-container'>
						<ul className='dropdown-menu'>
							{nav.other_nav.map((inner_nav, inner_index) =>
								renderButton(inner_nav, inner_index, true)
							)}
						</ul>
					</div>
				) : null}
			</li>
		);
	}

	return renderButton(nav, index);
}
