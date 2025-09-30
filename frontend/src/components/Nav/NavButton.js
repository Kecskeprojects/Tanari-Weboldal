import { useContext } from 'react';
import { SearchContext, UserContext } from '../../Contexts';
import { pushStateWithEvent } from '../../Helpers/pushStateHelper';
import navService from '../../Services/navService';
import DeleteIcon from '../DeleteIcon';

export default function NavButton({
	nav = { Name: 'unknown', Url: 'unknown', other_Nav: [] },
	index = 0,
}) {
	const userContext = useContext(UserContext);
	const searchContext = useContext(SearchContext);

	function isDropdown(nav) {
		return nav.other_Nav && nav.other_Nav.length > 0;
	}

	function navigate(e, currNav) {
		if (e.target.tagName.toLowerCase() == 'a') {
			searchContext.setSearchKeyword('');
			pushStateWithEvent(e, null, currNav.Name, currNav.Url);
			return;
		}
		e.preventDefault();
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
				{dropdown ? (
					<div className='relative-container'>
						<ul className='dropdown-menu'>
							{nav.other_Nav.map((inner_nav, inner_index) =>
								renderButton(inner_nav, inner_index, true)
							)}
						</ul>
					</div>
				) : null}
				<a
					className={
						(isInner ? 'dropdown-item' : 'nav-link') +
						(dropdown ? ' dropdown-toggle' : '')
					}
					href={nav.Url}
					onClick={(e) => navigate(e, nav)}
				>
					<DeleteIcon
						onDeleteFunction={() =>
							navService.Remove(
								nav.NavId,
								userContext.userData.token
							)
						}
						afterDeleteFunction={(result) => {
							if (result?.error) {
								window.alert(result.error);
							}
							window.location.reload();
						}}
						className='mt-1'
						show={
							!isDropdown(nav) &&
							userContext.userData.isLoggedIn()
						}
					/>
					{nav.Name}
				</a>
			</li>
		);
	}

	return renderButton(nav, index);
}
