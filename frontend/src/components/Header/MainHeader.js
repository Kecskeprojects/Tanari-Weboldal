import { useContext, useState } from 'react';
import '../../css/Header.css';
import PopupTypeEnum from '../../Enum/PopupTypeEnum';
import Button from '../Button';
import HomeLink from './HomeLink';
import LoginElement from './LoginElement';
import NavPopupDetail from './NavPopupDetail';
import PopupBase from '../PopupBase';
import navService from '../../Services/navService';
import { UserContext } from '../../Contexts';

export default function MainHeader() {
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

	return (
		<header style={{ backgroundImage: 'url(./img/header-img.jpg)' }}>
			{renderPopups()}
			<HomeLink />
			<div className='text-end'>
				<LoginElement />
				<br />
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
					className='me-2'
				/>
			</div>
		</header>
	);
}
