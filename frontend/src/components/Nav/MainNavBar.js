import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts';
import PopupTypeEnum from '../../Enum/PopupTypeEnum';
import navService from '../../Services/navService';
import '../../css/Nav.css';
import Button from '../Button';
import NavButton from './NavButton';

export default function MainNavBar() {
	const [navJSON, setNavJSON] = useState(null);
	const [panel, setPanel] = useState(PopupTypeEnum.None);

	const context = useContext(UserContext);

	function navOnSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		const parentNavName = window.location.pathname.replace('/', '');
		if (parentNavName) {
			data.append('parentNavUrl', parentNavName);
		}
		navService.Create(data, context.userData.token).then(() => {
			window.location.reload();
		});
	}

	function renderPopups() {
		switch (panel) {
			case PopupTypeEnum.CreateNav: {
				return (
					<PopupBase
						popupDetail={NavPopupDetail}
						onSubmitFunction={navOnSubmit}
						onCancel={() => setPanel(PopupTypeEnum.None)}
					/>
				);
			}
			default:
				return null;
		}
	}

	useEffect(() => {
		navService
			.GetAllForNavbar() /*No loading*/
			.then((nav) => {
				setNavJSON(nav);
			});
	}, []);

	return (
		<div className='nav-container'>
			{renderPopups()}
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
				<Button
					label='Navigáció Hozzáadás'
					onClickFunction={() => setPanel(PopupTypeEnum.CreateNav)}
					afterDeleteFunction={(result) => {
						if (result?.error) {
							window.alert(result.error);
							return;
						}
						window.location.reload();
					}}
					className='me-3'
				/>
			</ul>
		</div>
	);
}
