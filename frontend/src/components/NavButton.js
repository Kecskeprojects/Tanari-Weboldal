import { useContext } from 'react';
import { pushStateWithEvent } from '../Helpers/pushStateHelper';
import { UserContext } from '../Contexts';
import navService from '../Services/navService';
import DeleteIcon from './DeleteIcon';

export default function NavButton({
	nav = { Name: 'unknown', Url: 'unknown', other_nav: [] },
	index = 0,
}) {
	const context = useContext(UserContext);

	function isDropdown(nav) {
		return nav.other_nav && nav.other_nav.length > 0;
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
					onClick={(e) =>
						pushStateWithEvent(e, null, nav.Name, nav.Url)
					}
				>
					<DeleteIcon
						onDeleteFunction={() =>
							navService.Remove(nav.NavId, context.userData.token)
						}
						className='mt-2'
						show={context.userData.isLoggedIn()}
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
