import { useState } from 'react';
import '../../css/Header.css';
import PopupTypeEnum from '../../enum/PopupTypeEnum';
import Button from '../Button';
import HomeLink from './HomeLink';
import LoginElement from './LoginElement';

export default function MainHeader() {
	const [panel, setPanel] = useState(PopupTypeEnum.None);

	return (
		<header style={{ backgroundImage: 'url(./img/header-img.jpg)' }}>
			<HomeLink />
			<div className='text-end'>
				{/*Todo: Create a popup for the nav editing, the parentnavId will come from the user's current location,
				either move the location context up to app or use the url to get the location*/}
				<LoginElement />
				<br />
				<Button
					label='Navigáció Hozzáadás'
					onClickFunction={() => setPanel(PopupTypeEnum.CreateNav)}
					className='me-2'
				/>
			</div>
		</header>
	);
}
