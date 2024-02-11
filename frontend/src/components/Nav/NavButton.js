import { useContext } from 'react';
import { pushStateWithEvent } from '../../Helpers/pushStateHelper';
import { UserContext } from '../../Contexts';
import navService from '../../Services/navService';
import DeleteIcon from '../DeleteIcon';

export default function NavButton({
	nav = { Name: 'unknown', Url: 'unknown', other_Nav: [] },
	index = 0,
}) {
	const context = useContext(UserContext);

	function isDropdown(nav) {
		return nav.other_Nav && nav.other_Nav.length > 0;
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
					onClick={(e) => {
						if (e.target.tagName.toLowerCase() == 'a') {
							pushStateWithEvent(e, null, nav.Name, nav.Url);
							return;
						}
						e.preventDefault();
					}}
				>
					<DeleteIcon
						onDeleteFunction={() =>
							navService.Remove(nav.NavId, context.userData.token)
						}
						afterDeleteFunction={(result) => {
							if (result?.error) {
								window.alert(result.error);
								return;
							}
							window.location.reload();
						}}
						className='mt-1'
						show={!isDropdown(nav) && context.userData.isLoggedIn()}
					/>
					{nav.Name}
				</a>
				{dropdown ? (
					<div className='relative-container'>
						<ul className='dropdown-menu'>
							{nav.other_Nav.map((inner_nav, inner_index) =>
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
