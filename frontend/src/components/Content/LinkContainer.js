import { useContext } from 'react';
import linkService from '../../Services/linkService';
import DeleteIcon from '../DeleteIcon';
import { UserContext } from '../../Contexts';

export default function LinkContainer({
	link = { LinkId: 0, Url: 'unknown', Title: 'txt', OpenNewTab: false },
	refresh = () => {},
}) {
	const context = useContext(UserContext);
	return (
		<div className='link-container'>
			<DeleteIcon
				onDeleteFunction={() =>
					linkService.Remove(link.LinkId, context.userData.token)
				}
				afterDeleteFunction={refresh}
				show={context.userData.isLoggedIn()}
			/>
			<a
				href={link.Url}
				target={link.OpenNewTab === true ? '_blank' : '_self'}
				rel='noreferrer'
			>
				{link.Title}
			</a>
		</div>
	);
}
