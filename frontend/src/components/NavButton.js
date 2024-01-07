import { pushStateWithEvent } from '../Helpers/pushStateHelper';

export default function NavButton({
	nav = { Name: 'unknown', Url: 'unknown', other_nav: [] },
	index = 0,
}) {
	function isDropdown(nav) {
		return nav.other_nav && nav.other_nav.length > 0;
	}

	function onNavClick(e, title, url) {
		e.preventDefault();
		pushStateWithEvent(null, title, url);
	}

	//Todo: Add a delete icon on the right end of navbar that deletes nav from db
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
