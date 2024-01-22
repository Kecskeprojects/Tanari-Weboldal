import linkService from '../Services/linkService';
import DeleteIcon from './DeleteIcon';

export default function LinkContainer({
	link = { LinkId: 0, Url: 'unknown', Title: 'txt' },
	userData = {},
	refresh = () => {},
}) {
	return (
		<div className='link-container'>
			<DeleteIcon
				onDeleteFunction={() =>
					linkService.Remove(link.LinkId, userData.token)
				}
				afterDeleteFunction={refresh}
				show={userData.isLoggedIn()}
			/>
			<a href={link.Url}>{link.Title}</a>
		</div>
	);
}
